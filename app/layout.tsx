import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Тахмазян Лаб — фамильная лаборатория исследований и инженерных разработок',
  description: 'Проекты, заметки и история развития личной технологической лаборатории.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}<Script id="yandex-metrika" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111101320', 'ym');

ym(111101320, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}</Script><noscript><div><img src="https://mc.yandex.ru/watch/111101320" style={{position:'absolute', left:'-9999px'}} alt="" /></div></noscript></body></html>;
}
