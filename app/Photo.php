<?php

    namespace App;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;
    use Carbon\Carbon;

    class Photo extends Model
    {
        protected $table = 'photos';

        protected $fillable = [
            'user_id', 'name', 'animal_name', 'animal_age', 'file'
        ];

        public function likes() {
            return $this->belongsToMany('App\User', 'likes', 'photo_id', 'user_id')->withTimestamps();
        }

        public function user() {
            return $this->belongsTo('App\User');
        }

        public function votedIn24Hours() {

            if (Auth::check())
            {
                $user_id = Auth::user()->id;

                $rows_count = DB::table('likes')
                    ->where([
                        ['photo_id', $this->id],
                        ['user_id', Auth::user()->id],
                        ['created_at', '>', Carbon::now()->subHours(24)->toDateTimeString()],
                    ])->count();

                if ($rows_count > 0) return true;
            }

            return false;
        }
    }
