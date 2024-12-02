import GetProducts from "@/hooks/GetProducts";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/Types";
import ProductBox from "@/components/ProductComponents/ProductBox";
import TheLatest from "@/components/HomeComponents/TheLatest";

export default async function Home() {
  const { products } = await GetProducts();
  const ulimate: Product[] = products.filter((pro: Product) => pro.section === 'ultimate-designs');
  return (
    <>
      <main className="grid grid-cols-2 relative tab:grid-cols-1">
        <div>
          <Image
            src={`/imgs/PosterOne.jpg`}
            width={800}
            height={800}
            alt="Poster"
            className="w-full h-full brightness-[0.3]"
            priority
            unoptimized
          />
        </div>
        <div>
          <Image
            src={`/imgs/rectangleTwo.jpg`}
            width={800}
            height={800}
            alt="Poster"
            className="w-full h-full brightness-[0.3]"
            priority
            unoptimized
          />
        </div>
        <motion.div
          className="text-center absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)' }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-base">ABOVE THE CLOUDS</h2>
          <h1 className="text-2xl my-3 tracking-wider">WEAR LIKE A BOSS</h1>
          <Link href={`/category`} className="px-12 bg-white text-black py-1">
            <button>
              SHOP NOW
            </button>
          </Link>
        </motion.div>
      </main>
      <div
        className=" overflow-hidden my-2">
        <div className="flex gap-6 slider">
          {
            [...Array(15)].map((_, index) => (
              <div key={index} className="flex items-center gap-6 text-xl -scale-x-100">
                <p className="tracking-wider">BLACK</p>
                <p className="tracking-wider">WOLF</p>
              </div>
            ))
          }
        </div>
      </div>
      <main className="grid grid-cols-2 tab:flex tab:flex-col-reverse">
        <section className="p-3 h-full">
          <div>
            <p className="text-2xl tracking-widest text-center">Ultimate Designs</p>
          </div>
          <div className="scrollbox my-8 gap-4 h-full">
            {
              ulimate.map((pro: Product) => (
                <div key={pro.id} className="relative h-full">
                  <ProductBox product={pro} easyAdd={true} key={pro.id} />
                </div>
              ))
            }
          </div>
        </section>
        <section>
          <video
            autoPlay
            style={{ filter: 'brightness(.7) grayscale(1) contrast(.9)' }}
            poster="/vids/poster.png">
            <source src="/vids/PosterVideo.mp4" />
          </video>
        </section>
      </main>
      <TheLatest products={products} />
    </>
  );
}
