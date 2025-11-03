export default function ContactPage() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h1>
            <p className="text-slate-600 mb-8">Have questions or feedback? We’d love to hear from you!</p>

            <form className="space-y-4 max-w-md">
                <input type="text" placeholder="Your Name" className="w-full border rounded-md px-4 py-2" />
                <input type="email" placeholder="Your Email" className="w-full border rounded-md px-4 py-2" />
                <textarea placeholder="Message" rows={5} className="w-full border rounded-md px-4 py-2"></textarea>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Send Message
                </button>
            </form>
        </section>
    );
}
