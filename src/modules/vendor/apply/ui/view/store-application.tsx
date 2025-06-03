import { ApplicationForm } from "./application-form";

interface Props {
  userId: string;
}

export const StoreApplication = ({ userId }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Store Application
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our marketplace by completing this application. Once
              approved, you'll be able to showcase your products to millions of
              customers.
            </p>
          </div>
          <ApplicationForm userId={userId} />
        </div>
      </main>
    </div>
  );
};
