import { Logo } from "@/components/Logo";


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center">
            <div className="mt-12">
                <Logo />
                <div className="mt-10">{children}</div>
            </div>
        </div>
    );
}

export default layout;