"use client";
import React from "react";
import Card from "./Card";

export default function View({ ticketId }: { ticketId: string }) {

  return (
    <React.Fragment>
      <Card ticketId={ticketId}/>
    </React.Fragment>
  );
}
