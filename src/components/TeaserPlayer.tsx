export default function TeaserPlayer({ videoId }: { videoId: string }) {
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-30 flex justify-center items-center hidden" id="teaser-container" onClick={() => {
        const iframe = document.getElementById('iframe');
        const overlay = document.getElementById('teaser-container');
        if (iframe && overlay) {
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const src = iframe.getAttribute('src');
            if (src) {
                iframe.setAttribute('src', src.replace('autoplay=1', 'autoplay=0'));
            }
        }
    }}>
        <iframe className="w-5/6 h-5/6 rounded-lg" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`} id="iframe" title="Bande-annonce" allow="autoplay; encrypted-media" allowFullScreen></iframe>
    </div>
  )
}