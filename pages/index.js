import Head from 'next/head'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Results from '../components/Results'
import Footer from '../components/Footer'
import requests from '../utils/requests'

export default function Home({results}) {
  
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Head>
        <title>Nulu - Stream TV & Movies</title>
        <meta name="description" content="Stream thousands of shows and movies with Nulu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Results results={results}/>
      <Footer />
    </div>
  )
}



export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(`https://api.themoviedb.org/3${
    requests[genre]?.url || requests.fetchTrending.url
  }`).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
  
}
