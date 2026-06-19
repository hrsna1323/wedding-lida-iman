<?php
$html = file_get_contents('index.html');
$html = preg_replace('/Dibuat dengan/is', 'Made with', $html);
$html = preg_replace('/by.{1,5}Wekita\.id/is', 'by hrsna.id', $html);
file_put_contents('index.html', $html);
echo "Done";
?>
