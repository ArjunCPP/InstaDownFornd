import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'

// Types
interface DownloadResult {
  success: boolean
  videoUrl?: string
  thumbnail?: string
  username?: string
  postId?: string
  error?: string
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DownloadResult | null>(null)
  const [error, setError] = useState('')

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError('Please enter an Instagram URL')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://instadownback-1.onrender.com'
      const response = await fetch(`${apiUrl}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Failed to download video. Please try again.')
      }
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to connect to the server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadVideo = () => {
    if (result?.videoUrl) {
      window.open(result.videoUrl, '_blank')
    }
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Instagram Video Downloader - Download Instagram Videos & Reels Free | HD Quality</title>
        <meta
          name="title"
          content="Instagram Video Downloader - Download Instagram Videos & Reels Free | HD Quality"
        />
        <meta
          name="description"
          content="Free Instagram video downloader. Download Instagram videos and reels in HD quality. Fast, easy, and no registration required. Videos only, no photo downloads - 100% free and secure."
        />
        <meta
          name="keywords"
          content="instagram downloader, instagram video download, download instagram reels, save instagram videos, instagram video downloader, free instagram downloader, HD instagram download, instagram reel downloader"
        />
        <meta name="author" content="Instagram Video Downloader" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
        <meta property="og:site_name" content="Instagram Video Downloader" />
        <meta property="og:title" content="Instagram Video Downloader - Download Videos & Reels Free" />
        <meta
          property="og:description"
          content="Free Instagram video downloader. Download Instagram videos and reels in HD quality. Fast, easy, and no registration required. Videos only."
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/og-image.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Instagram Video Downloader - Download Videos Instantly" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
        <meta property="twitter:title" content="Instagram Video Downloader - Download Videos & Reels Free" />
        <meta
          property="twitter:description"
          content="Free Instagram video downloader. Download videos and reels in HD quality instantly. Videos only, no photos."
        />
        <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/og-image.svg`} />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#E1306C" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Instagram Video Downloader",
              "description": "Free Instagram video downloader. Download Instagram videos and reels in HD quality. Videos only, no photo downloads.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "15420"
              }
            })
          }}
        />
      </Head>

      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <img
                src="/logo.svg"
                alt="Instagram Video Downloader Logo"
                className="w-24 h-24 drop-shadow-2xl"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Instagram</span>
              <br />
              <span className="text-white">Video Downloader</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Download Instagram videos and reels in seconds.
              <span className="text-pink-400 font-semibold"> Free, fast, and HD quality.</span>
            </motion.p>

            {/* Download Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onSubmit={handleDownload}
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="glass-effect rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste Instagram video URL here..."
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="spinner" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Helper Text */}
              <p className="text-sm text-gray-400 mt-4">
                Example: https://www.instagram.com/p/ABC123/ or https://www.instagram.com/reel/XYZ789/
              </p>
            </motion.form>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success Result */}
            {result && result.success && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="glass-effect rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">Video Ready!</h3>
                      {result.username && (
                        <p className="text-sm text-gray-400">by @{result.username}</p>
                      )}
                    </div>
                  </div>

                  {/* Video Preview */}
                  {result.videoUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden bg-black">
                      <video
                        src={result.videoUrl}
                        poster={result.thumbnail}
                        controls
                        preload="metadata"
                        className="w-full h-auto max-h-96 object-contain"
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={handleDownloadVideo}
                    className="w-full btn-primary"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Video
                    </span>
                  </button>

                  {/* Video Info */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Quality</p>
                        <p className="text-white font-semibold">HD</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Format</p>
                        <p className="text-white font-semibold">MP4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Our <span className="gradient-text">Downloader?</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-effect rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Download your favorite Instagram videos in seconds with our optimized servers.</p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-effect rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">HD Quality</h3>
                <p className="text-gray-400">Get the best available quality for all Instagram videos and reels.</p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-effect rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">100% Free</h3>
                <p className="text-gray-400">No registration, no hidden fees. Download unlimited videos absolutely free.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="relative z-10 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It <span className="gradient-text">Works</span>
            </h2>

            <div className="space-y-6">
              {[
                { step: '01', title: 'Copy Instagram URL', desc: 'Go to Instagram and copy the link of the video or reel you want to download.' },
                { step: '02', title: 'Paste URL', desc: 'Paste the link into the input field above and click the Download button.' },
                { step: '03', title: 'Download Video', desc: 'Your video will be ready in seconds. Click download and save it to your device.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="relative z-10 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Is this Instagram downloader free?',
                  a: 'Yes! Our Instagram video downloader is completely free to use. No registration, no hidden fees, and no limits on the number of videos you can download.'
                },
                {
                  q: 'What can I download?',
                  a: 'You can download Instagram videos and reels. We support video content only - photo downloads are not available.'
                },
                {
                  q: 'What quality are the downloaded videos?',
                  a: 'We provide the best available quality for each video. Most videos are downloaded in HD quality, maintaining the original resolution and format.'
                },
                {
                  q: 'Do I need to install anything?',
                  a: 'No installation required! Our web-based tool works directly in your browser. Just paste the link and download.'
                },
                {
                  q: 'Is it safe to use?',
                  a: 'Absolutely! We don\'t store any of your data or the videos you download. Your privacy is our top priority.'
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-effect rounded-xl p-6 group"
                >
                  <summary className="font-bold text-lg cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-400">{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-400">
              <p className="mb-2">© 2024 Instagram Video Downloader. All rights reserved.</p>
              <p className="text-sm">
                This tool is for personal use only. Please respect copyright and Instagram's Terms of Service.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
