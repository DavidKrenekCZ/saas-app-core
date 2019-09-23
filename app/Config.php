<?php

    namespace App;

    use App\Http\Requests\Request;
    use Illuminate\Database\Eloquent\Model;
    use Carbon\Carbon;


    class Config extends Model {
        protected $table = 'config';

        protected $fillable = [
            'date_from', 'date_to', 'max_files', 'description1', 'description2', 'description3', 'textarea1', 'textarea2', 'sticky_video', 'gate_hyperlink',
            'article_1_title', 'article_1_link', 'article_2_title', 'article_2_link'
        ];

        public static function getBgImage() {
            $dir = new \DirectoryIterator(public_path("uploads"));
            foreach ($dir as $fileinfo)
                if (!$fileinfo->isDot())
                    if (substr($fileinfo->getFilename(), 0, 10) == "background")
                    {
                        $file_path = "uploads/".$fileinfo->getFilename();
                        $timestamp = filemtime($file_path);
                        return $file_path.'?'.$timestamp;
                    }
            return "uploads/background.jpg";
        }

        public static function getCoverImage() {
            $dir = new \DirectoryIterator(public_path("uploads"));
            foreach ($dir as $fileinfo)
                if (!$fileinfo->isDot())
                    if (substr($fileinfo->getFilename(), 0, 5) == "cover")
                    {
                        $file_path = "uploads/".$fileinfo->getFilename();
                        $timestamp = filemtime($file_path);
                        return $file_path.'?'.$timestamp;
                    }
            return "uploads/cover.jpg";
        }

        public static function getArticleImage($article_num) {

            $image_name = 'article-'.$article_num;

            $dir = new \DirectoryIterator(public_path("uploads"));
            foreach ($dir as $fileinfo)
                if (!$fileinfo->isDot())
                    if (substr($fileinfo->getFilename(), 0, 9) == $image_name)
                    {
                        $file_path = "uploads/".$fileinfo->getFilename();
                        $timestamp = filemtime($file_path);
                        return $file_path.'?'.$timestamp;
                    }
            return "uploads/".$image_name.".jpg";
        }

        public static function getMetaOgImage($image) {
            $cover_image = Config::getCoverImage();
            if(!empty($image)) return asset('uploads/photos/'.$image);
            else return url($cover_image);
        }

        public static function getTermsFile() {
            $dir = new \DirectoryIterator(public_path("uploads"));
            foreach ($dir as $fileinfo)
                if (!$fileinfo->isDot())
                    if (substr($fileinfo->getFilename(), 0, 20) == "terms-and-conditions")
                    {
                        $file_path = "uploads/".$fileinfo->getFilename();
                        $timestamp = filemtime($file_path);
                        return $file_path.'?'.$timestamp;
                    }
            return "uploads/terms.pdf";
        }

        public static function isActive() {

            $config = Config::find(1);
            $now = Carbon::now();
            $fromDate = Carbon::parse($config->date_from);
            $toDate = Carbon::parse($config->date_to);

            if ($now->gte($fromDate) && $now->lte($toDate)) return true;

            return false;
        }
    }
