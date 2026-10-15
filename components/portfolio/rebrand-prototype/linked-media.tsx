// The shape of an image on the page. MediaFrame renders it: every image is a link to the
// real thing, a live site for products and apps, the repository for command-line tools.

export interface MediaItem {
  src: string
  alt: string
  video?: string
  // Short label for the switch when a frame holds more than one image.
  tab?: string
  // Shown next to the switch when the image needs a caveat, such as demo data.
  note?: string
}
