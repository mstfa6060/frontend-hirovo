import { Metadata } from 'next'
import ContentCard from '../components/ContentCard'

export const metadata: Metadata = {
  title: 'Gizlilik Politikasi - Hirovo',
  description: 'Hirovo Gizlilik Politikasi - Kisisel verilerinizin nasil toplandigi, kullanildigi ve korundugu hakkinda bilgi.',
}

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        <ContentCard>
          <h1 className="text-3xl font-bold mb-2 text-text max-sm:text-2xl">Gizlilik Politikasi</h1>
          <p className="text-muted text-sm mb-8">Son guncelleme: Ocak 2025</p>

          <p className="text-muted mb-4">
            Hirovo olarak, kullanicilarimizin gizliligine buyuk onem veriyoruz. Bu Gizlilik Politikasi, Hirovo mobil uygulamasi (&quot;Uygulama&quot;) araciligiyla topladigimiz kisisel verilerin nasil islendigini aciklamaktadir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">1. Topladigimiz Bilgiler</h2>
          <p className="text-muted mb-4">Uygulamamizi kullanirken asagidaki bilgileri toplayabiliriz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li><strong>Hesap Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarasi</li>
            <li><strong>Profil Bilgileri:</strong> Ozgecmis, is deneyimi, egitim bilgileri, beceriler</li>
            <li><strong>Konum Bilgileri:</strong> Yakininızdaki is ilanlarini gosterebilmek icin konum verisi (izninizle)</li>
            <li><strong>Cihaz Bilgileri:</strong> Cihaz turu, isletim sistemi, uygulama surumu</li>
            <li><strong>Kullanim Verileri:</strong> Uygulama ici etkilesimler, goruntulenen ilanlar, basvurular</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">2. Bilgilerin Kullanim Amaclari</h2>
          <p className="text-muted mb-4">Topladigimiz bilgileri su amaclarla kullaniyoruz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Hesabinizi olusturmak ve yonetmek</li>
            <li>Size uygun is ilanlarini gostermek</li>
            <li>Is basvurularinizi isverenlere iletmek</li>
            <li>Uygulama deneyimini iyilestirmek</li>
            <li>Teknik destek saglamak</li>
            <li>Yasal yukumluluklerimizi yerine getirmek</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">3. Bilgilerin Paylasimi</h2>
          <p className="text-muted mb-4">Kisisel verilerinizi su durumlar disinda ucuncu taraflarla paylasmiyoruz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li><strong>Isverenler:</strong> Basvuru yaptiginiz is ilanlarinin sahipleriyle profil bilgilerinizi paylasıriz</li>
            <li><strong>Hizmet Saglayicilar:</strong> Uygulamamizin calismasi icin gerekli teknik hizmetleri sunan guvenilir ortaklarla</li>
            <li><strong>Yasal Zorunluluklar:</strong> Yasal surecler veya yetkili makamlarin talebi dogrultusunda</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">4. Veri Guvenligi</h2>
          <p className="text-muted mb-4">Kisisel verilerinizi korumak icin endustri standardi guvenlik onlemleri uyguluyoruz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>SSL/TLS sifreleme</li>
            <li>Guvenli veri merkezleri</li>
            <li>Duzenli guvenlik denetimleri</li>
            <li>Erisim kontrolu ve yetkilendirme</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">5. Haklariniz</h2>
          <p className="text-muted mb-4">6698 sayili Kisisel Verilerin Korunmasi Kanunu (KVKK) kapsaminda asagidaki haklara sahipsiniz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
            <li>Kisisel verileriniz islenmisse buna iliskin bilgi talep etme</li>
            <li>Kisisel verilerinizin islenme amacini ve bunlarin amacina uygun kullanilip kullanilmadigini ogrenme</li>
            <li>Yurt icinde veya yurt disinda kisisel verilerin aktarildigi ucuncu kisileri bilme</li>
            <li>Kisisel verilerin eksik veya yanlis islenmis olmasi halinde bunlarin duzeltilmesini isteme</li>
            <li>Kisisel verilerinizin silinmesini veya yok edilmesini isteme</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">6. Cerezler ve Takip Teknolojileri</h2>
          <p className="text-muted mb-4">
            Uygulamamiz, deneyiminizi iyilestirmek icin cerezler ve benzer teknolojiler kullanabilir. Bu teknolojiler sayesinde tercihlerinizi hatirlar ve uygulama performansini analiz ederiz.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">7. Cocuklarin Gizliligi</h2>
          <p className="text-muted mb-4">
            Uygulamamiz 18 yasın altindaki bireylere yonelik degildir. Bilerek 18 yasin altindaki kisilerden kisisel veri toplamiyoruz.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">8. Politika Degisiklikleri</h2>
          <p className="text-muted mb-4">
            Bu Gizlilik Politikasi&apos;ni zaman zaman guncelleyebiliriz. Onemli degisiklikler olmasi durumunda sizi uygulama ici bildirimlerle bilgilendireceğiz.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">9. Iletisim</h2>
          <p className="text-muted mb-4">Gizlilik ile ilgili sorulariniz icin bizimle iletisime gecebilirsiniz:</p>
          <ul className="text-muted list-disc pl-6 mb-4">
            <li>E-posta: <a href="mailto:hello@hirovo.com" className="text-hirovo-teal hover:underline">hello@hirovo.com</a></li>
          </ul>
        </ContentCard>
      </div>
    </main>
  )
}
