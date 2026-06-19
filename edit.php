<?php
$html = file_get_contents('index.html');

// 1. Countdown Date -> June 28, 2026 10:00:00
// Wait, the data-date might be "Jun 12 2026 10:00:00" because I changed it in my first replace.php maybe? No, let's just regex replace data-date inside wpkoi-elements-countdown-items.
$html = preg_replace('/class="wpkoi-elements-countdown-items" data-date="[^"]+"/', 'class="wpkoi-elements-countdown-items" data-date="Jun 28 2026 10:00:00"', $html);

// 2. Made with by hrsna.id
$html = str_replace('by&nbsp;Wekita.id', 'by hrsna.id', $html);
$html = str_replace('by Wekita.id', 'by hrsna.id', $html);
$html = str_replace('Dibuat dengan', 'Made with', $html);

// 3. Remove WhatsApp near form
// Let's remove the social icons for WhatsApp if they exist
$html = preg_replace('/<a class="elementor-icon elementor-social-icon elementor-social-icon-whatsapp[^>]+>.*?<\/a>/is', '', $html);

// Also remove any WeddingPress WA send button if any
$html = preg_replace('/<button[^>]*class="[^"]*wa-btn[^"]*"[^>]*>.*?<\/button>/is', '', $html);

file_put_contents('index.html', $html);
echo "Done";
?>
