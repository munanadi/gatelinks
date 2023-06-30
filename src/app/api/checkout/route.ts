import { candypay } from "@/helpers/candypay";

export async function POST(request: Request) {
  try {
    const response = await candypay.session.create({
      success_url: new URL(request.url).origin + "/success",
      cancel_url: new URL(request.url).origin,
      items: [
        {
          name: "Candy",
          image:
            "https://image.lexica.art/full_jpg/e23fb8fd-6856-43ac-b8f9-c853aafd86d1",
          quantity: 1,
          price: 1,
        },
      ],
    });

    return Response.redirect(response.payment_url);
  } catch (e) {
    return new Response("Unable to create session", {
      status: 500,
    });
  }
}
