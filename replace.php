<?php
$html = file_get_contents('index_wekita.html');

// 1. Cover Names
$html = str_replace('Habib &amp; Adiba', 'Arianti &amp; Riduan', $html);
$html = str_replace('The Wedding of<br>Habib &amp; Adiba', 'The Wedding of<br>Arianti &amp; Riduan', $html);

// 2. Cover Initials (H & A in the cover)
// It's rendered as H ... divider ... A
$html = preg_replace('/<h2 class="elementor-heading-title elementor-size-default">H<\/h2>/', '<h2 class="elementor-heading-title elementor-size-default">A</h2>', $html, 1);
$html = preg_replace('/<h2 class="elementor-heading-title elementor-size-default">A<\/h2>/', '<h2 class="elementor-heading-title elementor-size-default">R</h2>', $html, 1);

// 3. Verse Initials
$html = str_replace('H &amp; A', 'A &amp; R', $html);

// 4. Hero Date
$html = str_replace('<p>Minggu, 29 Desember 2024</p>', '<p>Minggu, 28 Juni 2026</p>', $html);

// 5. Groom -> Bride (Template Groom -> User Bride)
$html = str_replace('Habib Yulianto', 'Arianti Maulida', $html);
$html = str_replace('Putra dari Bapak H. M. Dawam <br />&amp; Ibu Dewi Sudarwati (Almh)', 'Putri ketiga dari Bapak Muhammad As\'ad <br />&amp; Ibu Nur Asikin', $html);

// 6. Bride -> Groom (Template Bride -> User Groom)
$html = str_replace('Adiba Putri Syakila', 'Riduan Iman', $html);
$html = str_replace('Putri dari Bapak Anas Rifai <br />&amp; Ibu Kholifah', 'Putra kedua dari Bapak M. Rafi\'i <br />&amp; Ibu Marlinah', $html);

// SWAP IMAGES SO BRIDE HAS BRIDE PHOTO AND GROOM HAS GROOM PHOTO
// The template had Groom first. We replaced Groom with Bride. So the first image is now Bride.
// First image was `Muslim-19-P-Terpusat-1-1.webp` (Pria). We want it to be `Muslim-19-w-Terpusat-1-1.webp` (Wanita).
// Second image was `Muslim-19-w-Terpusat-1-1.webp`. We want it to be `Muslim-19-P-Terpusat-1-1.webp`.

// We use a temporary placeholder to swap
$html = str_replace('Muslim-19-P-Terpusat-1-1.webp', 'TEMP_IMG_WANITA.webp', $html);
$html = str_replace('Muslim-19-w-Terpusat-1-1.webp', 'Muslim-19-P-Terpusat-1-1.webp', $html);
$html = str_replace('TEMP_IMG_WANITA.webp', 'Muslim-19-w-Terpusat-1-1.webp', $html);


// 7. Akad Nikah
$html = str_replace('<h2 class="elementor-heading-title elementor-size-default">Akad Nikah</h2>				</div>
				</div>
				<div class="elementor-element elementor-element-6b8e0699 revealin elementor-widget elementor-widget-text-editor" data-id="6b8e0699" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Minggu</p>								</div>
				</div>
				<div class="elementor-element elementor-element-1a0cd21c revealkiri elementor-widget elementor-widget-counter" data-id="1a0cd21c" data-element_type="widget" data-widget_type="counter.default">
				<div class="elementor-widget-container">
							<div class="elementor-counter">
						<div class="elementor-counter-number-wrapper">
				<span class="elementor-counter-number-prefix"></span>
				<span class="elementor-counter-number" data-duration="2000" data-to-value="29" data-from-value="0" data-delimiter=",">0</span>
				<span class="elementor-counter-number-suffix"></span>
			</div>
		</div>
						</div>
				</div>
				<div class="elementor-element elementor-element-c567b6c revealkanan elementor-widget elementor-widget-text-editor" data-id="c567b6c" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Desember 2024</p>', 
'<h2 class="elementor-heading-title elementor-size-default">Akad Nikah</h2>				</div>
				</div>
				<div class="elementor-element elementor-element-6b8e0699 revealin elementor-widget elementor-widget-text-editor" data-id="6b8e0699" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Kamis</p>								</div>
				</div>
				<div class="elementor-element elementor-element-1a0cd21c revealkiri elementor-widget elementor-widget-counter" data-id="1a0cd21c" data-element_type="widget" data-widget_type="counter.default">
				<div class="elementor-widget-container">
							<div class="elementor-counter">
						<div class="elementor-counter-number-wrapper">
				<span class="elementor-counter-number-prefix"></span>
				<span class="elementor-counter-number" data-duration="2000" data-to-value="16" data-from-value="0" data-delimiter=",">0</span>
				<span class="elementor-counter-number-suffix"></span>
			</div>
		</div>
						</div>
				</div>
				<div class="elementor-element elementor-element-c567b6c revealkanan elementor-widget elementor-widget-text-editor" data-id="c567b6c" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>April 2026</p>', $html);

// 8. Resepsi
$html = str_replace('<h2 class="elementor-heading-title elementor-size-default">Resepsi</h2>				</div>
				</div>
				<div class="elementor-element elementor-element-3d14bd24 revealin elementor-widget elementor-widget-text-editor" data-id="3d14bd24" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Minggu</p>								</div>
				</div>
				<div class="elementor-element elementor-element-66b459de revealkiri elementor-widget elementor-widget-counter" data-id="66b459de" data-element_type="widget" data-widget_type="counter.default">
				<div class="elementor-widget-container">
							<div class="elementor-counter">
						<div class="elementor-counter-number-wrapper">
				<span class="elementor-counter-number-prefix"></span>
				<span class="elementor-counter-number" data-duration="2000" data-to-value="29" data-from-value="0" data-delimiter=",">0</span>
				<span class="elementor-counter-number-suffix"></span>
			</div>
		</div>
						</div>
				</div>
				<div class="elementor-element elementor-element-4da1803c revealkanan elementor-widget elementor-widget-text-editor" data-id="4da1803c" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Desember 2024</p>',
'<h2 class="elementor-heading-title elementor-size-default">Resepsi</h2>				</div>
				</div>
				<div class="elementor-element elementor-element-3d14bd24 revealin elementor-widget elementor-widget-text-editor" data-id="3d14bd24" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Minggu</p>								</div>
				</div>
				<div class="elementor-element elementor-element-66b459de revealkiri elementor-widget elementor-widget-counter" data-id="66b459de" data-element_type="widget" data-widget_type="counter.default">
				<div class="elementor-widget-container">
							<div class="elementor-counter">
						<div class="elementor-counter-number-wrapper">
				<span class="elementor-counter-number-prefix"></span>
				<span class="elementor-counter-number" data-duration="2000" data-to-value="28" data-from-value="0" data-delimiter=",">0</span>
				<span class="elementor-counter-number-suffix"></span>
			</div>
		</div>
						</div>
				</div>
				<div class="elementor-element elementor-element-4da1803c revealkanan elementor-widget elementor-widget-text-editor" data-id="4da1803c" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Juni 2026</p>', $html);

// Also replace locations
$html = str_replace('<p><strong>Sportorium UMY</strong><br />Jl. Brawijaya Ngebel Tamantirto Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta&nbsp;</p>', '<p><strong>Gg. Kubah KH. Zakaria RT.02</strong><br />Desa Bakarangan Kecamatan Kusan Hulu, Tanah Bumbu</p>', $html);
$html = str_replace('href="https://www.google.com/maps"', 'href="https://maps.app.goo.gl/YnCSmHgxpZX9crDG9"', $html);

// Bank Number & Name
$html = preg_replace('/1234 5678 90/', '1799 9939 54', $html);
$html = preg_replace('/<p class="elementor-heading-title elementor-size-default">Habib<\/p>/', '<p class="elementor-heading-title elementor-size-default">Riduan Iman</p>', $html);

// Remove the external script cleanup block to not interfere with Elementor
$html = preg_replace('/<script id="cleanup-universal-bootstrap">.*?<\/script>/is', '', $html);

// Inject background music configuration
$html = preg_replace('/<\/body>/', '
<audio id="bgMusic" loop preload="auto">
    <source src="audio/bg-music.mp3" type="audio/mpeg">
</audio>
</body>', $html);

file_put_contents('index.html', $html);
echo "Done";
?>
