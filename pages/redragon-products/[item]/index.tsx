import React from "react";
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Firebase
import { firebaseDB } from "../../../firebase/client";

// Data
// import { keyboardsData } from "../../../data/fakeData";

// Types
import { Ikeyboard } from "../../../types/types";

// Components
import { KeyboardDetailsComp } from "../../../components/reusable/keyboardDetails/keyboardDetails";

// Styles
import s from '../redragon.module.scss'
import 'react-multi-carousel/lib/styles.css';

export const getStaticPaths: GetStaticPaths = async () => {

    const querySnapshot = await getDocs(collection(firebaseDB, "keyboards"));
    const paths = querySnapshot.docs.map(doc => {
        return { params: { item: doc.id } }
    })

    return {
        paths,
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const docRef = doc(firebaseDB, "keyboards", params!.item as string);
    const docSnap = await getDoc(docRef);

    return {
        props: {
            data: docSnap.data() as Ikeyboard
        },
        revalidate: 10
    }

}

const Item: NextPage<{data: Ikeyboard}> = (props) => {

    const { data } = props

    return (
        <div>

            <Head>
                <title> KBDZ | {data.name} </title>
            </Head>
            
            <main className={s.itemRoot}>

                <div className={s.itemDetails}>

                    <Carousel className={s.itemImg} responsive={responsive}>
                        <div>
                            <Image height={500} width={500} src={require('../../../public/mech-png.png')} alt={data.name} />
                        </div>
                    </Carousel>

                    <KeyboardDetailsComp data={data} />

                </div>

            </main>

        </div>
    )

}

export default Item

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
}