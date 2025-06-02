
export async  function emailContainsTickets(email: string): Promise<boolean> {
  if (email) {
    return true;
  } else {
    return false;
  }


}