import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="mb-8">
            <Image
              src="/logo.svg"
              alt="YourCommunity.Space"
              width={120}
              height={120}
              className="mx-auto h-24 w-auto"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Space for Community Events
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A non-profit platform built for organizers, by organizers. Raise funds for your events, connect with your community, and make a lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start-organizing" className="btn-primary">
              Start Organizing
            </Link>
            <Link href="/find-events" className="btn-secondary">
              Find Events
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose YourCommunity.Space?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">Fundraising Made Easy</h3>
              <p className="text-gray-600">
                Set up crowdfunding campaigns for your events with transparent tracking and easy payouts.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">Community Focused</h3>
              <p className="text-gray-600">
                Build and engage with your community through meaningful events and shared experiences.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4">Non-Profit Mission</h3>
              <p className="text-gray-600">
                We&apos;re committed to supporting organizers and building stronger communities, not profits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">How YourCommunity.Space Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Create Your Event', desc: 'Set up your event details and funding goals' },
              { step: 2, title: 'Share with Community', desc: 'Promote your event and funding campaign' },
              { step: 3, title: 'Receive Support', desc: 'Collect funds and manage your event' },
              { step: 4, title: 'Make an Impact', desc: 'Host your event and grow your community' },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl font-bold text-primary-600">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Your Community Space?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join YourCommunity.Space today and start creating meaningful events that bring people together.
          </p>
          <Link href="/start-organizing" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Get Started Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent"></div>
      </section>
    </div>
  );
}
