import Image from "next/image";
import { client } from "@/app/sanity/client";
import { urlForImage } from "@/lib/urlForImages";

const CONTACT_QUERY = `*[_type == "contact"]{
  name,
  email,
  location,
  phone,
  profileImage,
  socialLinks
}`;

interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

interface SocialLink {
  _key: string;
  platform: string;
  url: string;
  icon?: SanityImage;
}

interface ContactData {
  name: string;
  email: string;
  location: string;
  phone: string;
  profileImage?: SanityImage;
  socialLinks?: SocialLink[];
}

export default async function Contact() {
  const data: ContactData[] = await client.fetch(CONTACT_QUERY);

  const contact = data?.[0];

  if (!contact) {
    return (
      <>
        <section className="w-full px-6 py-20">
          <div className="max-w-4xl mx-auto text-center text-gray-400">
            <p>Contact information is not available.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="w-full min-h-screen px-6 py-20 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
        <div className="max-w-4xl mx-auto shadow-2xl rounded-3xl p-12 bg-[#001330]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="flex flex-col md:flex-row items-center gap-12 flex-1">
              {contact.profileImage && (
                <div className="relative w-48 h-48">
                  <Image
                    src={urlForImage(contact.profileImage)
                      .width(400)
                      .height(400)
                      .url()}
                    alt={contact.name}
                    fill
                    className="rounded-full object-cover shadow-xl"
                    sizes="192px"
                  />
                </div>
              )}

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white">
                  {contact.name}
                </h1>

                <div className="mt-6 space-y-3 text-gray-600 text-lg">
                  <p>
                    <span className="font-semibold text-white">Email:</span>{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-100 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </p>

                  <p>
                    <span className="font-semibold text-white">Phone:</span>{" "}
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-100 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </p>

                  <p className="text-white">
                    <span className="font-semibold">Location:</span>{" "}
                    {contact.location}
                  </p>
                </div>
                {contact.socialLinks && contact.socialLinks.length > 1 && (
                  <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                    {contact.socialLinks.slice(0, -1).map((link) => (
                      <a
                        key={link._key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl shadow-sm hover:shadow-md"
                      >
                        {link.icon && (
                          <div className="relative w-6 h-6">
                            <Image
                              src={urlForImage(link.icon)
                                .width(50)
                                .height(50)
                                .url()}
                              alt={link.platform}
                              fill
                              className="object-contain rounded"
                              sizes="24px"
                            />
                          </div>
                        )}

                        <span className="capitalize font-medium text-gray-800">
                          {link.platform}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {contact.socialLinks &&
              contact.socialLinks.length > 0 &&
              (() => {
                const venmo =
                  contact.socialLinks[contact.socialLinks.length - 1];

                return (
                  <div className="flex flex-col items-center md:items-end">
                    <a
                      href={venmo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent w-[220px] h-[220px] flex items-center justify-center"
                    >
                      {venmo.icon && (
                        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center">
                          <div className="relative w-20 h-20">
                            <Image
                              src={urlForImage(venmo.icon)
                                .width(100)
                                .height(100)
                                .url()}
                              alt="Venmo"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </a>
                  </div>
                );
              })()}
          </div>
        </div>
      </section>
    </>
  );
}
