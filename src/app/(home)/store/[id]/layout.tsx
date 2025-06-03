import { Footer } from "@/modules/home/store/ui/view/footer";
import { Navbar } from "@/modules/home/store/ui/view/navbar";

interface Props {
  children: React.ReactNode;
}

const StoreLayout = ({ children }: Props) => {
  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default StoreLayout;
