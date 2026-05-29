import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-main">
        <h2 className="section-title mb-2 text-center">Наши работы</h2>
        <p className="mb-10 text-center text-gray-600">
          Реальные объекты по всей Мордовии
        </p>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
