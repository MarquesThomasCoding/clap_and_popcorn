import { Facebook, Twitter, Linkedin } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`,
  };

  return (
    <div className="flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-600 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg">
      <h2 className="text-xl">Partager sur :</h2>
      <div className="flex gap-4">
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="w-8 h-8" />
        </a>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="w-8 h-8" />
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;
