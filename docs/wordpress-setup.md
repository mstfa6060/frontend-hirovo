# WordPress CMS Kurulum Rehberi - Hirovo

Bu rehber, `https://cms.hirovo.com` adresindeki WordPress CMS'in Hirovo frontend ile entegre calisacak sekilde yapilandirilmasini kapsar.

**Frontend:** Next.js 16 (App Router), `https://hirovo.com`
**CMS API:** `https://cms.hirovo.com/wp-json`
**Desteklenen Diller (9):** Turkce (tr), Ingilizce (en), Fransizca (fr), Almanca (de), Ispanyolca (es), Rusca (ru), Hintce (hi), Italyanca (it), Arapca (ar)

---

## 1. Polylang Eklentisi Kurulumu ve Yapilandirmasi

### 1.1 Eklenti Kurulumu

1. WordPress admin paneline giris yapin: `https://cms.hirovo.com/wp-admin`
2. **Eklentiler > Yeni Ekle** bolumune gidin
3. **"Polylang"** aratip kurun ve etkinlestirin
4. **Polylang Pro** (ucretli) tercih edilir cunku REST API destegi dahildir. Ucretsiz versiyonda ek eklenti gerekir (bkz. 1.3)

### 1.2 Dilleri Ekleme

**Ayarlar > Diller > Diller** sekmesine gidin. Asagidaki 9 dili sirasiyla ekleyin:

| Sira | Dil         | Kod | Bayrak  | Varsayilan |
|------|-------------|-----|---------|------------|
| 1    | Turkce      | tr  | tr      | Evet       |
| 2    | English     | en  | us / gb | Hayir      |
| 3    | Francais    | fr  | fr      | Hayir      |
| 4    | Deutsch     | de  | de      | Hayir      |
| 5    | Espanol     | es  | es      | Hayir      |
| 6    | Russkiy     | ru  | ru      | Hayir      |
| 7    | Hindi       | hi  | in      | Hayir      |
| 8    | Italiano    | it  | it      | Hayir      |
| 9    | al-Arabiyya | ar  | sa      | Hayir      |

**Onemli Ayarlar:**
- **Varsayilan dil:** Turkce (tr)
- Arapca (ar) icin **RTL (Sagdan sola)** secenegini etkinlestirin
- Her dil icin **Dil kodu** (locale) alaninin dogru oldugunu dogrulayin

### 1.3 URL Yapisi

**Ayarlar > Diller > URL degisiklikleri** sekmesinde:

- **URL degisiklikleri:** "Dil kodu" (The language is set from the directory name in the URL) secin
- Bu, sayfa URL'lerini `/en/about`, `/fr/about` formatinda olusturur

REST API'de dil parametresi olarak `?lang=XX` kullanilir. Frontend zaten bu formatta cagri yapiyor:

```typescript
// lib/api/services/wordpress.ts - mevcut implementasyon
if (params?.locale) {
  query.lang = params.locale;
}
```

### 1.4 Polylang REST API Destegi

**Polylang Pro** kullaniyorsaniz REST API destegi dahildir.

**Ucretsiz Polylang** kullaniyorsaniz, `?lang=` parametresinin REST API'de calismasi icin ek islem gerekir. Su eklentiyi kurun:

- **Polylang REST API** (Flavor tarafindan) - WordPress eklenti dizininde mevcuttur

Veya temadaki `functions.php` dosyasina su kodu ekleyin:

```php
// functions.php - Polylang REST API destegi (yalnizca ucretsiz Polylang icin)
add_filter('rest_query_vars', function ($vars) {
    $vars[] = 'lang';
    return $vars;
});

// REST API yanilarina dil bilgisi ekle
add_filter('rest_prepare_post', function ($response, $post) {
    if (function_exists('pll_get_post_language')) {
        $response->data['lang'] = pll_get_post_language($post->ID);
        $response->data['translations'] = pll_get_post_translations($post->ID);
    }
    return $response;
}, 10, 2);

add_filter('rest_prepare_page', function ($response, $post) {
    if (function_exists('pll_get_post_language')) {
        $response->data['lang'] = pll_get_post_language($post->ID);
        $response->data['translations'] = pll_get_post_translations($post->ID);
    }
    return $response;
}, 10, 2);
```

### 1.5 Dogrulama

Kurulumdan sonra su API cagrilarinin calistigini dogrulayin:

```bash
# Turkce yazilar (varsayilan)
curl "https://cms.hirovo.com/wp-json/wp/v2/posts?lang=tr"

# Ingilizce yazilar
curl "https://cms.hirovo.com/wp-json/wp/v2/posts?lang=en"

# Turkce sayfalar
curl "https://cms.hirovo.com/wp-json/wp/v2/pages?slug=about&lang=tr"

# Ingilizce sayfalar
curl "https://cms.hirovo.com/wp-json/wp/v2/pages?slug=about&lang=en"

# Turkce kategoriler
curl "https://cms.hirovo.com/wp-json/wp/v2/categories?lang=tr"
```

---

## 2. WordPress Sayfa Olusturma

Frontend su sayfalari WordPress'ten cekiyor:

| Sayfa      | Slug       | Frontend Route   | Dosya                                  |
|------------|------------|------------------|----------------------------------------|
| Anasayfa   | homepage   | /                | app/[locale]/page.tsx                  |
| Hakkimizda | about      | /about           | app/[locale]/about/page.tsx            |
| Iletisim   | contact    | /contact         | app/[locale]/contact/page.tsx          |
| SSS        | faq        | /faq             | app/[locale]/faq/page.tsx              |

### 2.1 Turkce Sayfalari Olusturma (Ana icerik)

1. **Sayfalar > Yeni Ekle** bolumune gidin
2. Her sayfa icin:

#### Hakkimizda Sayfasi
- **Baslik:** Hakkimizda
- **Kalici bag:** `about`
- **Dil:** Turkce
- **Icerik:** Hirovo hakkinda kurumsal bilgiler

#### Iletisim Sayfasi
- **Baslik:** Iletisim
- **Kalici bag:** `contact`
- **Dil:** Turkce
- **Icerik:** Iletisim bilgileri, form detaylari

#### SSS Sayfasi
- **Baslik:** Sikca Sorulan Sorular
- **Kalici bag:** `faq`
- **Dil:** Turkce
- **Icerik:** SSS icerik blogu

#### Anasayfa Sayfasi (Opsiyonel)
- **Baslik:** Anasayfa
- **Kalici bag:** `homepage`
- **Dil:** Turkce
- **Icerik:** Anasayfa WordPress icerigi (frontend'de kullaniliyorsa)

### 2.2 Dil Cevirilerini Olusturma

Her Turkce sayfa icin diger 8 dilde ceviri olusturun:

1. Turkce sayfayi acin (ornegin "Hakkimizda")
2. Sag panelde **Diller** kutusunu bulun
3. Her dil icin **"+"** butonuna tiklayin
4. Yeni sayfada:
   - **Baslik:** O dildeki karsiligini yazin
   - **Kalici bag (slug):** Ayni slug'i kullanin (`about`, `contact`, `faq`)
   - **Icerik:** O dilde cevrilmis icerik
5. **Yayinla** butonuna tiklayin

**ONEMLI:** Tum dillerde slug ayni olmali (`about`, `contact`, `faq`). Frontend slug ile sorgulama yapiyor:

```typescript
// Frontend'deki cagri
wpContent = await wpApi.getPage("about", locale);
// Bu cagri: GET /wp/v2/pages?slug=about&lang=en
```

Polylang'da her dildeki ceviri sayfasi ayni slug'a sahip olabilir. Polylang `?lang=` parametresine gore dogru dildeki sayfayi dondurur.

### 2.3 Sayfa Cevirileri Tablosu

| Slug     | tr (Turkce)          | en (English)            | fr (Francais)        | de (Deutsch)         | es (Espanol)         | ru (Russkiy)         | hi (Hindi)           | it (Italiano)        | ar (Arabiyya)        |
|----------|----------------------|-------------------------|----------------------|----------------------|----------------------|----------------------|----------------------|----------------------|----------------------|
| about    | Hakkimizda           | About Us                | A propos             | Uber uns             | Sobre nosotros       | O nas                | Hamare baare mein    | Chi siamo            | An-na (Hakkimizda)   |
| contact  | Iletisim             | Contact                 | Contact              | Kontakt              | Contacto             | Kontakty             | Sampark              | Contatti             | Ittisal              |
| faq      | SSS                  | FAQ                     | FAQ                  | FAQ                  | Preguntas frecuentes | Chasto zadavaemye... | Aksar puche jaane... | Domande frequenti    | As'ila sha'i'a       |
| homepage | Anasayfa             | Homepage                | Accueil              | Startseite           | Inicio               | Glavnaya stranitsa   | Mukhya prshth        | Pagina principale    | As-safha ar-ra'isiya |

---

## 3. Blog Yapilandirmasi

### 3.1 Blog Kategorileri Olusturma

**Yazilar > Kategoriler** bolumunden her dil icin kategoriler olusturun.

Ornek kategoriler (Turkce):
- Is Arama Tavsiyeleri
- Kariyer Gelisimi
- Mulakat Hazirligi
- CV Yazimi
- Turkiye Is Piyasasi
- Teknoloji Sektoru
- Sirket Haberleri

**Cok dilli kategori olusturma:**

1. Turkce kategori olusturun (ornegin: "Is Arama Tavsiyeleri")
2. Kategori listesinde, ilgili satirdaki dil bayraklarina tiklayin
3. Her dil icin cevrilmis kategori adini girin

| Kategori (tr)           | en                   | fr                       | de                    | es                        |
|--------------------------|----------------------|--------------------------|-----------------------|---------------------------|
| Is Arama Tavsiyeleri     | Job Search Tips      | Conseils recherche       | Tipps Jobsuche        | Consejos busqueda empleo  |
| Kariyer Gelisimi         | Career Growth        | Developpement carriere   | Karriereentwicklung   | Desarrollo profesional    |
| Mulakat Hazirligi        | Interview Prep       | Preparation entretien    | Interviewvorbereitung | Preparacion entrevista    |
| CV Yazimi                | Resume Writing       | Redaction CV             | Lebenslauf schreiben  | Redaccion curriculim      |
| Turkiye Is Piyasasi      | Turkey Job Market    | Marche emploi Turquie    | Arbeitsmarkt Turkei   | Mercado laboral Turquia   |

### 3.2 Blog Yazilari Olusturma

1. **Yazilar > Yeni Ekle** bolumune gidin
2. Once Turkce yazi olusturun:
   - **Baslik:** Yazi basligi
   - **Icerik:** Detayli icerik (Gutenberg editor)
   - **Ozet (Excerpt):** Kisa ozet (blog listesinde gosterilir)
   - **One Cikan Gorsel (Featured Image):** Blog karti gorseli (onerilen boyut: 800x450px, 16:9 oran)
   - **Kategoriler:** Ilgili kategoriyi secin
   - **Dil:** Turkce
3. **Yayinla** butonuna tiklayin
4. Sag panelde diger diller icin ceviri olusturun

**Frontend'in beklentileri (mevcut kod):**

```typescript
// BlogListClient.tsx - Sayfalamali blog listesi
const result = await wpApi.getBlogPosts({
  page,
  pageSize: 12,
  category: selectedCategory || undefined,
  locale,  // ?lang=XX parametresi
});

// BlogCard.tsx - Her kart su alanlari kullaniyor:
// - post.title.rendered          (baslik)
// - post.excerpt.rendered        (ozet)
// - post.date                    (tarih)
// - post._embedded.wp:featuredmedia  (gorsel)
// - post._embedded.wp:term       (kategori)
```

### 3.3 Featured Image (One Cikan Gorsel) Ayarlari

**Ayarlar > Ortam** bolumunde:

- **Kucuk boyut:** 150x150
- **Orta boyut:** 300x300
- **Buyuk boyut:** 1024x1024

Ek olarak, tema veya eklenti ile ozel boyut tanimlayabilirsiniz:

```php
// functions.php
add_theme_support('post-thumbnails');
add_image_size('blog-card', 800, 450, true);    // Blog karti
add_image_size('blog-header', 1200, 675, true);  // Blog detay
```

### 3.4 Excerpt (Ozet) Ayarlari

WordPress varsayilan olarak otomatik ozet olusturur (ilk 55 kelime). Manuel ozet icin:

```php
// functions.php - Ozet uzunlugunu artir
add_filter('excerpt_length', function () {
    return 30; // 30 kelime
});

add_filter('excerpt_more', function () {
    return '...';
});
```

Frontend'de excerpt zaten `stripHtml()` ile temizleniyor, bu nedenle HTML taglerinden endise etmeye gerek yok.

### 3.5 Embed Destegi (`_embed` parametresi)

Frontend, blog yazilarini `_embed` parametresiyle ceker. Bu, featured media ve kategorileri tek bir istekte getirir:

```
GET /wp/v2/posts?_embed=wp:featuredmedia,wp:term&lang=tr
```

Bu davranis WordPress REST API'de varsayilan olarak desteklenir. Ek yapilandirma gerekmez.

---

## 4. REST API Ayarlari

### 4.1 CORS (Cross-Origin Resource Sharing) Ayarlari

Frontend `https://hirovo.com` domain'inden API'ye istek atar. CORS basliklarini yapilandirin:

```php
// functions.php veya bir mu-plugin olarak: wp-content/mu-plugins/cors.php

add_action('rest_api_init', function () {
    // CORS basliklarini REST API yaniltlarina ekle
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $allowed_origins = [
            'https://hirovo.com',
            'https://www.hirovo.com',
            'http://localhost:3000',      // gelistirme
            'http://localhost:3001',      // gelistirme
        ];

        $origin = get_http_origin();
        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }

        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');

        return $value;
    });
}, 15);
```

**ONEMLI:** `X-WP-Total` ve `X-WP-TotalPages` basliklarinin expose edilmesi gerekiyor. Frontend bunlari pagination icin kullaniyor:

```typescript
// wordpress.ts:114-115
total: parseInt(response.headers["x-wp-total"] || "0", 10),
totalPages: parseInt(response.headers["x-wp-totalpages"] || "1", 10),
```

### 4.2 API Performans Ayarlari

REST API yanit surelerini iyilestirmek icin:

#### `_fields` parametresi (zaten kullaniliyor)
Frontend zaten gerekli alanlari belirtiyor:
```
_fields=id,slug,title,excerpt,date,featured_media,categories,_links,_embedded
```

#### Sunucu tarafi cache (onerilen)
```php
// functions.php - REST API yanitlarini cache'le
add_filter('rest_post_dispatch', function ($response, $server, $request) {
    // Yalnizca GET istekleri icin
    if ($request->get_method() !== 'GET') {
        return $response;
    }

    // 5 dakika cache (frontend revalidate ile uyumlu)
    $response->header('Cache-Control', 'public, max-age=300, s-maxage=300');

    return $response;
}, 10, 3);
```

Bu, frontend'deki `revalidate = 300` (5 dakika) ISR ayariyla uyumludur.

### 4.3 Kalici Bag (Permalink) Ayarlari

**Ayarlar > Kalici Baglantilar** bolumunde:

- **Yapi:** "Yazi adi" (`/%postname%/`) secin
- Bu, slug bazli sorgularin duzgun calismasini saglar

### 4.4 REST API Endpoint Dogrulama

Tum endpoint'lerin calistigini dogrulayin:

```bash
# === Blog Yazilari ===
# Turkce blog yazilari (sayfalamali)
curl -I "https://cms.hirovo.com/wp-json/wp/v2/posts?lang=tr&per_page=12&page=1&_embed=wp:featuredmedia,wp:term"
# X-WP-Total ve X-WP-TotalPages basliklarinin donmesini dogrulayin

# Ingilizce blog yazilari
curl "https://cms.hirovo.com/wp-json/wp/v2/posts?lang=en&per_page=12&_embed=wp:featuredmedia,wp:term"

# Slug ile tekil yazi
curl "https://cms.hirovo.com/wp-json/wp/v2/posts?slug=ornek-yazi&lang=tr&_embed=wp:featuredmedia,wp:term"

# === Kategoriler ===
curl "https://cms.hirovo.com/wp-json/wp/v2/categories?lang=tr&per_page=100&hide_empty=true"
curl "https://cms.hirovo.com/wp-json/wp/v2/categories?lang=en&per_page=100&hide_empty=true"

# === Sayfalar ===
curl "https://cms.hirovo.com/wp-json/wp/v2/pages?slug=about&lang=tr"
curl "https://cms.hirovo.com/wp-json/wp/v2/pages?slug=about&lang=en"
curl "https://cms.hirovo.com/wp-json/wp/v2/pages?slug=contact&lang=fr"
curl "https://cms.hirovo.com/wp-json/wp/v2/pages?slug=faq&lang=de"

# === Custom Post Types (opsiyonel) ===
curl "https://cms.hirovo.com/wp-json/wp/v2/faq?lang=tr"
curl "https://cms.hirovo.com/wp-json/wp/v2/guide?lang=tr"
curl "https://cms.hirovo.com/wp-json/wp/v2/career_tip?lang=tr"
```

---

## 5. Custom Post Types (Opsiyonel)

Frontend kodunda su ozel icerik turleri tanimli. Bunlar opsiyonel olarak WordPress'te olusturulabilir:

### 5.1 FAQ Custom Post Type

```php
// functions.php
add_action('init', function () {
    register_post_type('faq', [
        'labels' => [
            'name'          => 'SSS',
            'singular_name' => 'SSS',
            'add_new'       => 'Yeni Soru Ekle',
            'add_new_item'  => 'Yeni Soru Ekle',
            'edit_item'     => 'Soruyu Duzenle',
        ],
        'public'       => true,
        'show_in_rest' => true,  // REST API'de gorunsun
        'has_archive'  => true,
        'supports'     => ['title', 'editor', 'custom-fields'],
        'menu_icon'    => 'dashicons-format-chat',
        'rewrite'      => ['slug' => 'faq-items'],
    ]);
});
```

### 5.2 Guide Custom Post Type

```php
add_action('init', function () {
    register_post_type('guide', [
        'labels' => [
            'name'          => 'Rehberler',
            'singular_name' => 'Rehber',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'has_archive'  => true,
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'menu_icon'    => 'dashicons-book',
    ]);
});
```

### 5.3 Career Tip Custom Post Type

```php
add_action('init', function () {
    register_post_type('career_tip', [
        'labels' => [
            'name'          => 'Kariyer Tavsiyeleri',
            'singular_name' => 'Kariyer Tavsiyesi',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'has_archive'  => true,
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'menu_icon'    => 'dashicons-lightbulb',
    ]);
});
```

### 5.4 Polylang ile CPT Entegrasyonu

Polylang'in custom post type'lari tanimasi icin:

**Ayarlar > Diller > Ayarlar > Ozel gonderi turleri ve taksonomiler** bolumunde:
- [x] faq
- [x] guide
- [x] career_tip

seceneklerini isaretleyin.

---

## 6. Onerilen Eklentiler

### 6.1 Zorunlu Eklentiler

| Eklenti                   | Amac                                      | Not                        |
|---------------------------|-------------------------------------------|----------------------------|
| **Polylang** (Pro/Free)   | Coklu dil destegi                         | 9 dil, REST API entegrasyonu |
| **Classic Editor** (veya Gutenberg) | Icerik duzenleme                | Tercih meselesi            |

### 6.2 Kesinlikle Onerilen Eklentiler

| Eklenti                   | Amac                                      | Not                        |
|---------------------------|-------------------------------------------|----------------------------|
| **ACF (Advanced Custom Fields)** | Ozel alanlar (FAQ question/answer) | `WPPage.acf` ve `WPFAQ.acf` alanlari icin |
| **Yoast SEO** veya **RankMath** | SEO optimizasyonu                  | Polylang ile uyumlu        |
| **WP REST Cache**         | REST API yanitlarini cache'leme           | API performansi            |
| **WP Super Cache** veya **W3TC** | Genel cache                       | Sunucu performansi         |

### 6.3 ACF Yapilandirmasi (FAQ icin)

Frontend, FAQ icerikleri icin ACF alanlarini bekliyor:

```typescript
// wordpress.ts:47-57 - WPFAQ tipi
export interface WPFAQ {
  acf?: {
    question?: string;
    answer?: string;
    category?: string;
  };
}
```

ACF'de olusturulacak alan grubu:

| Alan Adi  | Alan Tipi    | Konum                    |
|-----------|-------------|--------------------------|
| question  | Text Area   | Post Type = faq          |
| answer    | WYSIWYG     | Post Type = faq          |
| category  | Text        | Post Type = faq          |

ACF alanlarinin REST API'de gorunmesi icin:
- ACF ayarlarinda **"Show in REST API"** secenegini etkinlestirin
- Veya su kodu ekleyin:

```php
// functions.php - ACF alanlarini REST API'de goster
add_filter('acf/settings/show_in_rest', '__return_true');
```

### 6.4 Yoast SEO + Polylang

Yoast SEO, Polylang ile uyumlu calisir. Her dildeki sayfa icin ayri SEO ayarlari yapilandirilabilir:

- Meta title / description her dil icin ayri
- Open Graph ve Twitter Card her dil icin ayri
- hreflang tagleri Polylang tarafindan otomatik eklenir
- XML sitemap her dil icin ayri olusturulur

---

## 7. Guvenlik Ayarlari

### 7.1 REST API Erisim Kontrolu

Yalnizca gerekli endpoint'leri acik birakin:

```php
// functions.php - Gereksiz endpoint'leri devre disi birak
add_filter('rest_endpoints', function ($endpoints) {
    // Kullanici bilgilerini gizle
    unset($endpoints['/wp/v2/users']);
    unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);

    // Yorum endpoint'ini gizle (kullanilmiyorsa)
    unset($endpoints['/wp/v2/comments']);

    return $endpoints;
});
```

### 7.2 WordPress Surumu ve XML-RPC

```php
// functions.php
// WordPress versiyonunu gizle
remove_action('wp_head', 'wp_generator');

// XML-RPC'yi devre disi birak
add_filter('xmlrpc_enabled', '__return_false');
```

### 7.3 Rate Limiting (Opsiyonel)

WordPress REST API icin rate limiting eklemek istiyorsaniz:

```php
// mu-plugins/rate-limit.php
add_filter('rest_pre_dispatch', function ($result, $server, $request) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = 'rest_rate_' . md5($ip);
    $count = (int) get_transient($key);

    if ($count > 100) { // dakikada 100 istek
        return new WP_Error(
            'rate_limit_exceeded',
            'Too many requests',
            ['status' => 429]
        );
    }

    set_transient($key, $count + 1, 60); // 60 saniye
    return $result;
}, 10, 3);
```

---

## 8. Icerik Olusturma Kontrol Listesi

### 8.1 Sayfalar

- [ ] **about** sayfasi - 9 dilde olusturuldu
- [ ] **contact** sayfasi - 9 dilde olusturuldu
- [ ] **faq** sayfasi - 9 dilde olusturuldu
- [ ] **homepage** sayfasi - 9 dilde olusturuldu (opsiyonel)

### 8.2 Blog

- [ ] En az 3 kategori olusturuldu (9 dilde)
- [ ] En az 1 ornek blog yazisi olusturuldu (9 dilde)
- [ ] Her blog yazisinda featured image var
- [ ] Her blog yazisinda excerpt (ozet) var
- [ ] Blog yazilari kategorilere atandi

### 8.3 Custom Post Types (Opsiyonel)

- [ ] FAQ custom post type olusturuldu
- [ ] ACF alanlari (question, answer, category) tanimlandi
- [ ] Guide custom post type olusturuldu
- [ ] Career Tip custom post type olusturuldu
- [ ] Polylang ayarlarinda CPT'ler etkinlestirildi

### 8.4 API Dogrulama

- [ ] `?lang=tr` parametresi calisiyor
- [ ] `?lang=en` parametresi calisiyor
- [ ] Diger 7 dil icin `?lang=XX` calisiyor
- [ ] `X-WP-Total` header'i denuyor
- [ ] `X-WP-TotalPages` header'i donuyor
- [ ] `_embed` parametresi featured media getiriyor
- [ ] CORS basiklari dogru yapilandirildi
- [ ] Frontend'den API cagrilari basarili

---

## 9. Sorun Giderme

### `?lang=` parametresi calismiyor
1. Polylang Pro mu yoksa ucretsiz mi kontrol edin
2. Ucretsiz ise "Polylang REST API" eklentisini kurun veya functions.php kodunu ekleyin
3. Kalici baglantilari yeniden kaydedin (Ayarlar > Kalici Baglantilar > Degisiklikleri Kaydet)

### CORS hatasi
1. `Access-Control-Allow-Origin` basligini kontrol edin
2. `X-WP-Total` ve `X-WP-TotalPages` basliklarinin `Expose-Headers`'da oldugunu dogrulayin
3. Nginx/Apache yapilandirmasinda CORS basliklarinin cift eklenmediginden emin olun

### Slug ile sayfa bulunamiyor
1. Tum dillerde slug'in ayni oldugunu dogrulayin (orn: hepsi `about`)
2. Sayfanin yayinlanmis (published) oldugunu kontrol edin
3. Polylang'da dil baglantisinin kurulmus oldugunu dogrulayin

### Featured image gorunmuyor
1. Yazinin one cikan gorseli atanmis mi kontrol edin
2. `_embed` parametresinin gonderildigini dogrulayin
3. Gorsel boyutunun makul oldugunu kontrol edin (max 2MB onerilen)

### Kategoriler bos donuyor
1. `hide_empty=true` parametresi kullanildigi icin, kategoride en az 1 yayin olmali
2. Kategorilerin dil baglantisinin kurulmus oldugunu dogrulayin

---

## 10. Ortam Degiskenleri

Frontend'de su ortam degiskenleri kullaniliyor:

```env
# .env.local (gelistirme)
NEXT_PUBLIC_WP_URL=https://cms.hirovo.com/wp-json

# Staging/Production icin
NEXT_PUBLIC_WP_URL=https://cms.hirovo.com/wp-json
```

WordPress tarafinda:
```
WP_HOME=https://cms.hirovo.com
WP_SITEURL=https://cms.hirovo.com
```

---

## 11. Mimari Ozet

```
Frontend (hirovo.com)                    WordPress CMS (cms.hirovo.com)
========================                 ================================

[Next.js App Router]                     [WordPress + Polylang]
  |                                        |
  |-- /tr/blog      ----GET /wp/v2/posts?lang=tr&_embed----->  Blog yazilari (TR)
  |-- /en/blog      ----GET /wp/v2/posts?lang=en&_embed----->  Blog yazilari (EN)
  |-- /fr/blog      ----GET /wp/v2/posts?lang=fr&_embed----->  Blog yazilari (FR)
  |                                        |
  |-- /tr/about     ----GET /wp/v2/pages?slug=about&lang=tr->  Hakkimizda (TR)
  |-- /en/about     ----GET /wp/v2/pages?slug=about&lang=en->  About Us (EN)
  |                                        |
  |-- /tr/faq       ----GET /wp/v2/pages?slug=faq&lang=tr--->  SSS (TR)
  |                    + GET /wp/v2/faq?lang=tr            -->  FAQ CPT items
  |                                        |
  |-- Blog Card     <-- post.title.rendered
  |                 <-- post.excerpt.rendered
  |                 <-- post._embedded["wp:featuredmedia"]
  |                 <-- post._embedded["wp:term"]
  |                                        |
  |-- Pagination    <-- X-WP-Total header
  |                 <-- X-WP-TotalPages header
```
