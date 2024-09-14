import { CutCornerButton } from "../components/CutCornerButton";
import { TextButton } from "../components/TextButton";

const listItems = [
    "Securely issue and manage government documents on a blockchain network.",
    "Instantly verify and authenticate government documents using blockchain-based smart contracts and cryptographic techniques.",
    "Track and manage government documents from issuance to revocation with a tamper-proof audit trail."
];

export const FeaturesGrid = () => {
    return (
        <section className="py-24 overflow-clip">
            <div className="container">
                <div className="flex flex-col gap-56">
                    <div className="grid grid-cols-3">
                        <div className="col-span-2">
                            <h2 className="font-heading font-black text-4xl">
                                Empowering the future of blockchain.
                            </h2>
                            <p className="text-xl text-zinc-400 mt-8">
                                Decentralized Identity provides a robust and secure infrastructure to support the next generation of decentralized identity management.
                            </p>
                            <ul className="flex flex-col gap-8 mt-12">
                                {listItems.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="inline-flex flex-shrink-0 justify-center items-center size-8 outline outline-4 -outline-offset-4 outline-fuchsia-500/10 rounded-full">
                                            <div className="size-1.5 bg-fuchsia-500 rounded-full"></div>
                                        </div>
                                        <span className="text-xl font-bold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-8 mt-12">
                                <CutCornerButton>Get Started</CutCornerButton>
                                <TextButton>Learn More</TextButton>
                            </div>
                        </div>
                        <div>
                            <div className="relative inline-flex z-0">
                                <img
                                    src="/assets/images/torus-knot.png"
                                    alt="Torus Knot 3D image"
                                    className="size-96 max-w-none"
                                />
                                <img
                                    src="/assets/images/hemisphere.png"
                                    alt="Hemisphere 3d shape"
                                    className="absolute size-96 top-3/4 -z-10 scale-x-[-1]" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-heading font-black text-4xl md:text-5xl">Streamlined Identity Verification</h1>
                        <div className="flex flex-col text-xl text-zinc-400 mt-6 gap-6">
                            <p>Simplify Know Your Customer (KYC) processes with our decentralized solution, enabling secure and efficient identity verification, reducing the burden of compliance, and minimizing the risk of fraud, while providing individuals with full control over their personal data.</p>
                            <p>Protect sensitive customer information with our decentralized KYC solution, utilizing blockchain technology and advanced cryptography to ensure data integrity, confidentiality, and transparency, while empowering individuals to maintain sovereignty over their personal data and identity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};