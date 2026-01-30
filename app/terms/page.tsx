import { Metadata } from 'next'
import ContentCard from '../components/ContentCard'

export const metadata: Metadata = {
  title: 'Kullanim Sartlari - Hirovo',
  description: 'Hirovo Kullanim Sartlari - Uygulamamizi kullanirken uymaniz gereken kurallar ve kosullar.',
}

export default function TermsPage() {
  return (
    <main className="flex-1 py-16">
      <div className="max-w-[1120px] mx-auto px-5">
        <ContentCard>
          <h1 className="text-3xl font-bold mb-2 text-text max-sm:text-2xl">Kullanim Sartlari</h1>
          <p className="text-muted text-sm mb-8">Son guncelleme: Ocak 2025</p>

          <p className="text-muted mb-4">
            Hirovo mobil uygulamasini (&quot;Uygulama&quot;) kullanarak asagidaki kullanim sartlarini kabul etmis sayilirsiniz. Lutfen bu sartlari dikkatlice okuyunuz.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">1. Hizmetin Tanimi</h2>
          <p className="text-muted mb-4">Hirovo, is arayanlar ile isverenler arasinda baglanti kurmayi amaclayan bir is bulma platformudur. Uygulamamiz araciligiyla:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Is ilanlarini goruntuleyebilir ve basvurabilirsiniz</li>
            <li>Profesyonel profilinizi olusturabilirsiniz</li>
            <li>Isverenlerden gelen teklifleri degerlendirebilirsiniz</li>
            <li>Kariyer firsatlarini takip edebilirsiniz</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">2. Hesap Olusturma ve Guvenlik</h2>
          <p className="text-muted mb-4">Uygulamamizi kullanmak icin bir hesap olusturmaniz gerekmektedir. Hesap olustururken:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Dogru ve guncel bilgiler saglamayi kabul edersiniz</li>
            <li>Hesap bilgilerinizin gizliliginden siz sorumlusunuz</li>
            <li>Hesabinizda gerceklesen tum aktivitelerden siz sorumlusunuz</li>
            <li>Yetkisiz erisim durumunda derhal bizi bilgilendirmelisiniz</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">3. Kullanici Yukumlulukleri</h2>
          <p className="text-muted mb-4">Uygulamamizi kullanirken asagidaki kurallara uymayi kabul edersiniz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Yasalara ve duzenlemelere uygun davranmak</li>
            <li>Dogru ve yaniltici olmayan bilgiler paylasmak</li>
            <li>Diger kullanicilarin haklarina saygi gostermek</li>
            <li>Spam, zararli yazilim veya kotu amacli icerik paylasmamak</li>
            <li>Uygulamanin guvenligini tehlikeye atacak eylemlerden kacinmak</li>
            <li>Baskalarinin kimligine burunmemek</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">4. Yasaklanan Davranislar</h2>
          <p className="text-muted mb-4">Asagidaki davranislar kesinlikle yasaktir:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Sahte is ilanlari veya profiller olusturmak</li>
            <li>Diger kullanicilari taciz etmek veya rahatsiz etmek</li>
            <li>Uygulamayi yasadisi amaclarla kullanmak</li>
            <li>Uygulamanin teknik altyapisina zarar vermek</li>
            <li>Otomatik sistemler veya botlar kullanmak</li>
            <li>Fikri mulkiyet haklarini ihlal etmek</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">5. Icerik ve Fikri Mulkiyet</h2>
          <p className="text-muted mb-4">Uygulama ve icerigindeki tum haklar Hirovo&apos;ya aittir:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Logo, tasarim ve arayuz Hirovo&apos;nun mulkiyetindedir</li>
            <li>Kullanici tarafindan yuklenen icerikler kullanicinin sorumluluğundadir</li>
            <li>Profilinizde paylastiginiz bilgiler icin gerekli lisanslari bize verirsiniz</li>
            <li>Iceriklerinizin ucuncu taraf haklarini ihlal etmemesi gerekmektedir</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">6. Sorumluluk Sinirlamasi</h2>
          <p className="text-muted mb-4">Hirovo:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Is ilanlarinin dogruluğunu garanti etmez</li>
            <li>Isveren-calisan iliskisinin tarafi degildir</li>
            <li>Kullanicilar arasi anlasmazliklardan sorumlu degildir</li>
            <li>Hizmetin kesintisiz calisacagini garanti etmez</li>
            <li>Dolayli veya sonuc olarak ortaya cikan zararlardan sorumlu degildir</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">7. Hesap Askiya Alma ve Sonlandirma</h2>
          <p className="text-muted mb-4">Asagidaki durumlarda hesabinizi askiya alabilir veya sonlandirabiliriz:</p>
          <ul className="text-muted list-disc pl-6 mb-4 space-y-2">
            <li>Kullanim sartlarinin ihlali</li>
            <li>Yasadisi faaliyetler</li>
            <li>Diger kullanicilara zarar veren davranislar</li>
            <li>Sahte veya yaniltici bilgi saglanmasi</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">8. Degisiklikler</h2>
          <p className="text-muted mb-4">
            Bu kullanim sartlarini onceden haber vermeksizin degistirme hakkini sakli tutariz. Onemli degisiklikler uygulama ici bildirimlerle duyurulacaktir. Degisikliklerden sonra uygulamayi kullanmaya devam etmeniz, yeni sartlari kabul ettiginiz anlamina gelir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">9. Uygulanacak Hukuk</h2>
          <p className="text-muted mb-4">
            Bu kullanim sartlari Turkiye Cumhuriyeti yasalarina tabidir. Uyusmazlik durumunda Istanbul Mahkemeleri ve Icra Daireleri yetkilidir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-text">10. Iletisim</h2>
          <p className="text-muted mb-4">Kullanim sartlari ile ilgili sorulariniz icin:</p>
          <ul className="text-muted list-disc pl-6 mb-4">
            <li>E-posta: <a href="mailto:hello@hirovo.com" className="text-hirovo-teal hover:underline">hello@hirovo.com</a></li>
          </ul>
        </ContentCard>
      </div>
    </main>
  )
}
