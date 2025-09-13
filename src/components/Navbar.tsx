import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-lg font-bold">MyApp</div>
            <div className="space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
        </div>
    </nav>
  );
}
