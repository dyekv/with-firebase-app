import React, { useState } from 'react'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
// import { postComment } from '../../lib/postComments'
import Head from 'next/head'
// import useRouter from 'next/router'
import DateCompornent from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
// import { format } from 'date-fns'
// import useSWR from 'swr';

import firebase from '../../firebase/clientApp'

// const fetcher = url => fetch(url).then(res => res.json())

export default function Post({ postData }) {

    const [name, setName] = useState("")
    const [comment, setComment] = useState("")

    // const { query } = useRouter()
    // const { data, error } = useSWR(
    //     () => query.id && `/api/postComment`,
    //     fetcher
    // )

    const sendData = () => {
        const db = firebase.firestore();
        db.collection('posts').add({
            body: comment,
            title: postData.title,
        })




        // postComment(postData.title, 'test')

        // const data = {
        //     name: name,
        //     comment: comment,
        //     date: new Date().toString(),
        //     title: postData.title,
        // }

        // const url = "http://localhost:3000/api/postComment"
        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     hedders: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json())
        //     .then(response => console.log('Success:', JSON.stringify(response)))
        //     .catch(error => console.error('Error:', error))
        // // return alert(format(new Date(), 'yyyy年MM月dd日'))
    }

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <DateCompornent dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
            <div>
                {"お名前"}<br />
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <p>{name}</p>
                {"コメント"}<br />
                <textarea
                    style={{ width: '100%', height: '100px', resize: 'none' }}
                    placeholder="コメントを入力してください"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                {comment}
                <button onClick={() => sendData()}>送信</button>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
