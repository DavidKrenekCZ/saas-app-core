<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\UploadRequest;
    use App\Config;
    use App\Photo;
    use App\User;
    use Carbon\Carbon;
    use Facebook\Exceptions\FacebookSDKException;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Support\Facades\URL;
    use Illuminate\Support\Facades\Validator;
    use Intervention\Image\ImageManagerStatic as Image;
    use Illuminate\Support\ViewErrorBag;
    use SammyK\LaravelFacebookSdk\LaravelFacebookSdk as Facebook;
    use Illuminate\Support\Facades\Input;
    use SammyK\LaravelFacebookSdk\LaravelFacebookSdk;
    use Jenssegers\Agent\Agent;
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

    class AppController extends Controller
    {
        public function __construct()
        {
            // $this->middleware(\HTMLMin\HTMLMin\Http\Middleware\MinifyMiddleware::class);
        }

        public function getMore() {
            $showed = base64_decode(Input::get('showed'));
            $showed_array = explode(',', $showed);

            $photos = Photo::whereNotIn('id', $showed_array)->take(9)->withCount('likes')->inRandomOrder()->get(function($photo) {
                return $photo->likes()->count();
            });

            return view('more')->with(compact('photos'));
        }

        public function executeCron()
        {
            // added likes counts to photos
            $photos = Photo::withCount('likes')->get();

            foreach ($photos as $photo)
            {
                $photo->likes = $photo->likes_count;
                $photo->save();
            }

            // added positions to photos
            $photos = Photo::orderBy('likes', 'DESC')->get();

            foreach ($photos as $key => $photo)
            {
                $position = $key+1;
                $photo->position = $position;
                $photo->save();
            }
        }

        public function getHomepage(Facebook $facebook)
        {
            $signedRequest = $facebook->getPageTabHelper();
            $appData = $signedRequest->getSignedRequest();

            if ($appData) {

                $appData = $appData->getPayload();

                if (isset($appData['app_data'])) {
                    return redirect(str_replace('http://', 'https://', urldecode($appData['app_data'])));
                }

                if (Auth::check() && isset($appData['page']['admin'])) {

                    if ($appData['page']['admin']) {
                        $user = Auth::user();
                        $user->admin = true;
                        $user->save();
                    } else {
                        $user = Auth::user();
                        $user->admin = false;
                        $user->save();
                    }
                }
            }

            $photos = Photo::withCount('likes')->inRandomOrder()->paginate(10);

            return view('app')->with(compact('photos'));
        }

        public function getWinnersList(){

            $photos = Photo::withCount('likes')->take(20)->orderBy('position')->where('position', '>', 0)->get(function($photo) {
                return $photo->likes()->count();
            });

            $no_more_photos = true;
            $photos_position = true;

            return view('app')->with(compact('photos', 'no_more_photos', 'photos_position'));
        }

        public function getReport(Facebook $facebook) {
            $serverFileName = "report1_".time();
            $downloadFileName = "zucastneni_report";
            if (Auth::user()->admin) {

                $data = User::get(['name', 'email', 'facebook_user_id'])->toArray();

                $spreadsheet = new Spreadsheet();
                $sheet       = $spreadsheet->getActiveSheet();

                // Header
                $sheet->setCellValue('A1', 'Jméno')
                    ->setCellValue('B1', 'E-mail')
                    ->setCellValue('C1', 'ID uživatele');

                $sheet->getStyle('A1:D1')->getFont()->setBold(true);

                // Data
                $sheet->fromArray($data, null, "A2");

                // Auto col width
                $sheet->getColumnDimension('A')->setAutoSize(true);
                $sheet->getColumnDimension('B')->setAutoSize(true);
                $sheet->getColumnDimension('C')->setAutoSize(true);

                $writer = new Xlsx($spreadsheet);
                $writer->save('uploads/reports/'.$serverFileName.'.xlsx');
                return response()->download(public_path("uploads/reports/".$serverFileName.".xlsx"), $downloadFileName.".xlsx");
            }
        }

        public function getPhotoReport() {
            $serverFileName = "report2_".time();
            $downloadFileName = "vitezove_report";

            if (Auth::user()->admin) {

                $photos = Photo::withCount('likes')->get()->sortByDesc(function($photo) {
                    return $photo->likes()->count();
                });

                $rows = [];
                foreach($photos as $photo) {

                    $data = [
                        $photo->user->name,
                        $photo->user->email,
                        $photo->likes_count.' ',
                        URL::to('uploads/photos/' . $photo->file),
                        $photo->name
                    ];

                    $rows[] = $data;
                }

                $spreadsheet = new Spreadsheet();
                $sheet       = $spreadsheet->getActiveSheet();

                // Header
                $sheet->setCellValue('A1', 'Jméno')
                    ->setCellValue('B1', 'E-mail')
                    ->setCellValue('C1', 'Lajků')
                    ->setCellValue('D1', 'Fotka')
                    ->setCellValue('E1', 'Popis fotky');

                $sheet->getStyle('A1:E1')->getFont()->setBold(true);

                // Data
                $sheet->fromArray($rows, null, "A2");

                // Auto col width
                $sheet->getColumnDimension('A')->setAutoSize(true);
                $sheet->getColumnDimension('B')->setAutoSize(true);
                $sheet->getColumnDimension('C')->setWidth(11);
                $sheet->getColumnDimension('D')->setAutoSize(true);
                $sheet->getColumnDimension('E')->setAutoSize(true);

                $writer = new Xlsx($spreadsheet);
                $writer->save('uploads/reports/'.$serverFileName.'.xlsx');
                return response()->download(public_path("uploads/reports/".$serverFileName.".xlsx"), $downloadFileName.".xlsx");
            }

        }

        public function getConfigure() {
            if (Auth::user()->admin) {
                return view('configure');
            }
        }

        public function postConfigure(Request $request) {

            if (Auth::user()->admin) {

                Config::first()->update($request->only(['date_from', 'date_to', 'max_files', 'description1', 'description2', 'description3', 'textarea1', 'textarea2']));

                $files = [
                    "cover-image"       => "cover",
                    "terms-file"        => "terms-and-conditions"
                ];

                foreach ($files as $input => $name)
                    if ($file = $request->file($input)) {
                        // Resize cover image to max 900 px width
                        if ($input == "cover-image"){
                            Image::make($file)->resize(900, null, function ($constraint) {
                                $constraint->aspectRatio();
                                $constraint->upsize();
                            })->save(public_path('uploads/' . $name.".".$file->getClientOriginalExtension()));
                        }
                        elseif ($input == "background-image")
                            Image::make($file)->save(public_path('uploads/' . $name.".".$file->getClientOriginalExtension()));
                        else
                            $file->move(public_path("uploads"), $name.".".$file->getClientOriginalExtension());
                    }

                return view('configure');
            }
        }

        public function getDetail($id, Request $request) {

            $request->session()->put('photo_detail', $id); // to return after login

            $photo_detail = Photo::withCount('likes')->whereId($id)->first();

            /*$photos = Photo::withCount('likes')->where('id', '!=', $id)->take(9)->get()->sortByDesc(function($photo) {
                return $photo->likes()->count();
            });*/

            $photos = Photo::withCount('likes')->where('id', '!=', $id)->inRandomOrder()->paginate(10);

            return view('app', compact('photo_detail', 'photos'));
        }

        public function getUpload() {
            /*if(!Carbon::now()->between(
               Carbon::createFromFormat('Y-m-d', Config::first()->date_from),
                Carbon::createFromFormat('Y-m-d', Config::first()->date_to))) {
                abort(404);
            }*/

            return view('upload');
        }

        public function postUpload(Request $request) {
            /*if(!Carbon::now()->between(
                Carbon::createFromFormat('Y-m-d', Config::first()->date_from),
                Carbon::createFromFormat('Y-m-d', Config::first()->date_to))) {
                abort(404);
            }*/

            $max_files = Config::first()->max_files;
            $max_rows = $max_files-1;
            $max_size = 5000;

            switch ($max_files) {
                case 1 : $max_files_text = 'fotografii'; break;
                case ($max_files >= 2 && $max_files <= 4) : $max_files_text = 'fotografie'; break;
                default : $max_files_text = 'fotografií';
            }

            $validation_rules = [
                'name' => 'max:120',
                'animal_name' => 'required',
                'animal_age' => 'required',
                'file' => 'required|image|max:'.$max_size.'|dimensions:min_width:800,min_height:600|max_rows:'.$max_rows,
                'phone' => 'required'
            ];

            $messages_rules = [
                'name.max' => 'Popis může být maximálně 120 znaků dlouhý.',
                'file.required' => 'Musíte vybrat fotku, kterou chcete do soutěže poslat.',
                'file.image' => 'Nahrávaný soubor není fotografie.',
                'file.dimensions' => 'Fotografie musí být minimálně 800px široká a 600px vysoká',
                'file.max_rows' => 'Můžete nahrát maximálně '.$max_files.' ' .$max_files_text,
                'file.max' => 'Maximální povolená velikost obrázku je '.($max_size/1000).' MB',
                'phone.required' => 'Musíte zadat Vaše telefonní číslo, na které se máme ozvat v případě výhry',
                'animal_name.required' => 'Vyplňte prosím jméno zvířete.',
                'animal_age.required' => 'Vyplňte prosím věk zvířete.',
            ];

            $validator = Validator::make(Input::all(), $validation_rules, $messages_rules);

            if($validator->fails()) {
                $view_errors = new ViewErrorBag();
                $view_errors->put('default', $validator->getMessageBag());
                return $this->postUploadErr(['errors'=> $view_errors, 'input'	=> Input::all()]);
            }

            $filename = md5($request->file('file')->getClientOriginalName() . microtime()) . '.' . $request->file('file')->getClientOriginalExtension();

            Image::make(Input::file('file'))->orientate()->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('uploads/photos/' . $filename));

            $new_photo = Photo::create([
                'user_id' => Auth::user()->id,
                'name' => $request->get('name'),
                'animal_name' => $request->get('animal_name'),
                'animal_age' => $request->get('animal_age'),
                'file' => $filename
            ]);

            $this->makePhotoThumb($new_photo->id);

            // save phone number
            $user = Auth::user();
            $user->phone = $request->get('phone');
            $user->save();

            return redirect()->route('myPhotos');
        }

        public function postUploadErr($arr) {
            return view('upload')->with($arr);
        }

        public function makePhotoThumb($id){

            $photo = Photo::findOrFail($id);
            $thumb = Image::make(public_path('uploads/photos/' . $photo->file))->fit(250);
            $thumb->save(public_path('uploads/photos/thumbs/'.$photo->file));
        }

        public function likePhoto($id) {

            $photo = Photo::findOrFail($id);

            // if($photo->likes()->where('user_id', Auth::user()->id)->count() == 0) {
            if (!$photo->votedIn24Hours()) {

                $photo->likes()->attach(Auth::user()->id);

                $user = Auth::user();
                $user->last_like_at = Carbon::now();
                $user->save();

                return json_encode(['status' => 'success']);
            }

            return json_encode(['status' => 'error']);
        }

        public function getMyPhotos() {
            $photos = Photo::where('user_id', Auth::user()->id)->withCount('likes')->get()->sortByDesc(function($photo) {
                return $photo->likes()->count();
            });

            Config::isActive();

            return view('my-photos')->with(compact('photos'));
        }

        public function callback(Facebook $facebook, Request $request)
        {
            if ($request->session()->has('photo_detail'))
            {
                $photo_detail = $request->session()->get('photo_detail');
                $app_url = $page_url = env('APP_URL').'mazlicek/'.$photo_detail;
            }
            else {
                $app_url = env('APP_URL');
                $page_url = env('PAGE_URL');
            }

            try {
                $token = $facebook->getRedirectLoginHelper()->getAccessToken();
            } catch (Exception $e) {
                return redirect($app_url);
                // abort(403);
            }

            if (!$token) {
                return redirect($app_url);
                // abort(403);
            }

            if (!$token->isLongLived()) {
                $oauth_client = $facebook->getOAuth2Client();

                try {
                    $token = $oauth_client->getLongLivedAccessToken($token);
                } catch (FacebookSDKException $e) {
                    return redirect($app_url);
                    // abort(403);
                }
            }

            $facebook->setDefaultAccessToken($token);
            Session::put('fb_user_access_token', (string)$token);

            try {
                $response = $facebook->get('/me?fields=id,name,email,link');
            } catch (FacebookSDKException $e) {
                return redirect($app_url);
                // abort(403);
            }

            $facebook_user = $response->getGraphUser();

            $user = User::createOrUpdateGraphNode($facebook_user);
            Auth::login($user);

            $agent = new Agent;
            if($agent->isDesktop())
                return redirect($app_url);

            if(empty($signedRequest)) {
                return redirect($app_url);
            }

            return redirect($app_url);
        }

        public function getLogin(Request $request) {

            $facebook = app(LaravelFacebookSdk::class);
            $helper = $facebook->getRedirectLoginHelper();

            $permissions = ['email'];
            $loginUrl = $helper->getLoginUrl(URL::route('callback'), $permissions);
            return redirect($loginUrl);
        }

        public function share() {
            if(Input::get('url')) {
                return redirect(env('PAGE_URL') . '?app_data=' . urlencode(Input::get('url')));
            }

            return redirect(env('PAGE_URL'));
        }

        public function shareImage($image) {
            return redirect(env('APP_URL').'?share-image='.$image);
        }

        public function clearDb(Request $request) {

            if (Auth::user()->admin) {

                /*$filesystem = new Filesystem;
                $photos = Photo::all();

                foreach ($photos as $photo) {
                    $file_name = $photo->file;
                    $filesystem->delete('uploads/photos/'.$file_name);
                    $filesystem->delete('uploads/photos/thumbs/'.$file_name);
                }*/

                DB::statement('SET FOREIGN_KEY_CHECKS=0;');
                DB::table('likes')->truncate();
                DB::table('photos')->truncate();
                DB::table('users')->where('admin', '=', 0)->delete();
                DB::statement('SET FOREIGN_KEY_CHECKS=1;');

                return redirect()->action('AppController@getHomepage');
            }
        }

        public function deleteImage($id) {
            if (Auth::user()->admin) {
                $photo = Photo::find($id);
                $photo->delete();
                return redirect()->action('AppController@getHomepage');
            }
        }
    }
