import { createClient } from "@supabase/supabase-js/dist/index.cjs";


const supabaseURL = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey){
    throw new Error("Der mangler key eller URL")
}

export const supabase = createClient(supabaseURL, supabaseAnonKey)

export async function requireAuth(req, res, next) {
  // Do something with the request
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                error: "header did not work"
            });
        //Først laver vi en authHeader, og tjekker om den eksisterer
        };
        //Hvis den eksisterer laver vi en token
        const token = authHeader.split(" ")[1]//Splitter a.k.a fjerner mellemrun(" ") og tager index 1: under authorization står der "bearer "(key)
        if(!token){
            return res.status(401).json({
                error: "Token did not work"
            });
        }
       const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Routen kan nu se, hvem der spørger
  req.userID = data.user.id;
  next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({error: "authentication dud not work"})
    }

  // If OK, call next() to continue

  // If not OK, send an error response
}

