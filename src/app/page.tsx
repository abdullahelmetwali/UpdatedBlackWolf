import Image from "next/image";
import Link from "next/link";
import { Product, RoomObj } from "@/interfaces/Types";
import ProductBox from "@/components/ProductComponents/ProductBox";
import TheLatest from "@/components/HomeComponents/TheLatest";
import GetProducts from "@/hooks/ProductsHooks/GetProducts";

export default async function Home() {
  const { products } = await GetProducts();
  const ulimate: Product[] = products.filter((pro: Product) => pro.section === 'ultimate-designs');
  const showroomObj: RoomObj[] = [
    {
      id: 0,
      img: '/imgs/AfricaShirt.jpg',
      title: 'CITY BEAT THREADS',
      desc: 'Sync your style with the pulsating heartbeat of the city, where fashion becomes a symphony of self-expression'
    },
    {
      id: 1,
      img: '/imgs/AfricaSpeakerT-Shirt.jpg',
      title: 'BRICK & MORTAR COUTURE',
      desc: 'In the architecture of fashion, every garment is a masterpiece, meticulously crafted from the building blocks of style.'
    },
    {
      id: 2,
      img: '/imgs/AfricaTwoT-Shirt.jpg',
      title: 'ASPHALT AESTHETICS',
      desc: 'Merge the sleek sophistication of high fashion with the gritty allure of the streets, as asphalt aesthetics.'
    },
    {
      id: 3,
      img: '/imgs/FUBU.jpg',
      title: 'UPTOWN REAL FUNK',
      desc: "Arm yourself with the savvy sophistication of urban style as you navigate the labyrinthine maze of fashions concrete jungle."
    },
  ]
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
        <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-base">ABOVE THE CLOUDS</h2>
          <h1 className="text-2xl my-3 tracking-wider">WEAR LIKE A BOSS</h1>
          <Link href={`/category/all`} className="px-12 bg-white text-black py-1">
            <button>
              SHOP NOW
            </button>
          </Link>
        </div>
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
          <div className="scrollbox justify-start my-8 gap-4 h-full">
            {
              ulimate.map((pro: Product) => (
                <div key={pro.id} className="relative h-full">
                  <ProductBox product={pro} easyAdd={true} key={pro.id} boxClass={undefined} >
                    <Link href={`/category/${pro.type ? pro.type : 'all'}/${pro.title.replaceAll(' ', '-').toLowerCase()}`} className="text-center my-1">
                      <p>{pro.title}</p>
                      <p>{pro.price}$</p>
                    </Link>
                  </ProductBox>
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
      <section className="grid grid-cols-2 items-center py-14 px-3 tab:grid-cols-1">
        <div className="text-center">
          <p className="text-3xl tracking-widest">OUR SHOWROOM</p>
          <div className="my-5">
            <p>413 James Street, Bulerigh Heads, Gold Coast, BossesLand Australia</p>
            <p>Mon - Fri, 10am - 9pm</p>
            <p>Weekends, 11am - 4pm</p>
          </div>
        </div>
        <div>
          <Image
            src={`/imgs/ourshowroom4.jpg`}
            width={650}
            height={650}
            alt="Our Showroom"
            title="Our Showroom"
          />
        </div>
      </section>
      <section className="scrollbox py-8 px-3 gap-3 justify-center">
        {
          showroomObj.map(box => (
            <div key={box.id}>
              <div className="h-[35rem] tab:h-[25rem] w-full tab:w-[65vw]">
                <Image
                  src={box.img}
                  alt={box.title}
                  width={360}
                  height={600}
                  title={box.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(.7) grayscale(1) contrast(.9)',
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-xl my-3 font-semibold">{box.title}</p>
                <p>{box.desc}</p>
              </div>
            </div>
          ))
        }

      </section>
    </>
  );
}
