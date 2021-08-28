import React from "react";
import { NextPage } from "next";
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import Head from 'next//head'

// Images
import bluetooth from '../../public/btooth.jpg'
import mech from '../../public/mech.jpg'
import membrane from '../../public/membrane.jpg'
import kb1 from '../../public/kb1.jpeg'
import kb2 from '../../public/kb2.jpeg'
import kb3 from '../../public/kb3.jpg'

// CSS
import "react-multi-carousel/lib/styles.css";
import s from './shop.module.scss'

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1224, min: 680 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 680, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }

const Shop: NextPage = () => {

    return (
        <div>

            <Head>
                <title> KBDZ | Shop </title>
            </Head>

            <Carousel containerClass={s.carousel} infinite={true} autoPlay={true} responsive={responsive}>
                <div>
                    <Image placeholder="blur" src={membrane} height={400} width={600} alt="asdfasdf" />
                </div>
                <div>
                    <Image placeholder="blur" src={mech} height={400} width={600} alt="asdfasdf" />
                </div>
                <div>
                    <Image placeholder="blur" src={bluetooth} height={400} width={600} alt="asdfasdf" />
                </div>
                <div>
                    <Image placeholder="blur" src={kb1} height={400} width={600} alt="asdfasdf" />
                </div>
                <div>
                    <Image placeholder="blur" src={kb2} height={400} width={600} alt="asdfasdf" />
                </div>
                <div>
                    <Image placeholder="blur" src={kb3} height={400} width={600} alt="asdfasdf" />
                </div>
            </Carousel>
            
            <div className={s.titleSection} >
                <h2> The Best Place for </h2>
                <h1> Mechanical Keyboards </h1>
            </div>

            <div className={s.membraneSection}>
                <div className={s.membraneInfo}>
                    <h1> Membrane </h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci recusandae voluptate ab temporibus? Est vero esse hic consectetur debitis et, minima repellat modi ducimus quis sed illum deleniti voluptatem inventore! </p>
                </div>

                <div className={s.membraneImg}>
                    <Image placeholder="blur" src={require('../../public/membrane-png.png')} height={200} width={400} alt="asdfasdf" />
                </div>
            </div>

        </div>
    )

}

export default Shop