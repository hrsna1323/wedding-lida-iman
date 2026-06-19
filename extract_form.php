<?php
$html = file_get_contents('index.html');
preg_match('/<form.*?<\/form>/is', $html, $m);
if(isset($m[0])) {
    file_put_contents('form.txt', $m[0]);
}
?>
