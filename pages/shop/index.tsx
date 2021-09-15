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
import switches from '../../public/switches.jpg'
import keycaps from '../../public/keycaps.jpg'
import casing from '../../public/case.jpg'

// CSS
import "react-multi-carousel/lib/styles.css";
import s from './shop.module.scss'

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1224 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1224, min: 680 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
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
                <h1 className={s.keyboards}> Keyboards </h1>
            </div>

            <div className={s.membraneSection}>
                <div className={s.membraneInfo}>
                    <h1> Membrane </h1>
                    <p> Membrane keyboards are the most common keyboards you will see. Underneath each key is a hollow membrane that flexes when the key is pressed down. When the key bottoms out it registers the keystroke. </p>
                </div>

                <div className={s.membraneImg}>
                    <Image placeholder="blur" src={require('../../public/membrane-png.png')} height={200} width={400} alt="asdfasdf" />
                </div>
            </div>

            <div className={s.mechSection}>
                <div className={s.mechInfo}>
                    <h1> Mechanical </h1>
                    <p> Mechanical keyboards have solid physical switches underneath each key. Each switch has an activation point that registers the keystroke when the switch reaches that point in its travel. </p>
                </div>

                <div className={s.mechImg}>
                    <Image placeholder="blur" src={require('../../public/mech-png.png')} height={400} width={400} alt="asdfasdf" />
                </div>
            </div>

            <div className={s.threeTiles}>
                <div className={s.tileBox}>
                    <div className={s.tile1}>
                        <Image placeholder="blur" src={switches} height={600} width={1000} alt="asdfasdf" />
                    </div>
                    <div className={s.tile2}>
                        <Image placeholder="blur" src={keycaps} height={600} width={1000} alt="asdfasdf" />
                    </div>
                </div>

                <div className={s.tile3}>
                    <Image placeholder="blur" src={casing} layout="intrinsic" alt="asdfasdf" />
                </div>
            </div>

            <div className={s.newsletter}>
                <form onSubmit={e => e.preventDefault()}>
                    <h1> Subscribe to our newsletter </h1>
                    <div className={s.inputForm}>
                        <label htmlFor=""> Enter Email Address </label>
                        <input placeholder="sample@gmail.com" type="email" name="email" />
                        <button> Subscribe </button>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default Shop