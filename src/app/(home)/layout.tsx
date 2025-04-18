import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-[#f4f4f0]">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;