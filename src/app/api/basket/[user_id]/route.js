import { getBasketById, patchBasket } from "../../../../../controller/basketController";

import { NextResponse } from "next/server";

export async function GET(request) {
    const splitUrl = request.url.split('/');
    const user_id = splitUrl[splitUrl.length - 1];
    const basket = await getBasketById(user_id);
    
    if (!basket) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    
    return NextResponse.json({ basket: basket }, { status: 200 });
  }

  export async function PATCH(request) {
    try {
      const splitUrl = request.url.split('/');
      const user_id = splitUrl[splitUrl.length - 1];
  
      const updateData = await request.json();
  
      const updatedBasket = await patchBasket(user_id, updateData);
  
      if (!updatedBasket) {
        return NextResponse.json({ error: "Update Failed or Basket Not Found" }, { status: 400 });
      }
  
      return NextResponse.json({ basket: updatedBasket }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
  }
  

