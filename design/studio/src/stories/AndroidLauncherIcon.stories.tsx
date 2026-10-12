import type { Meta, StoryObj } from "@storybook/react-vite";

// Canonical 108-unit foreground, shared verbatim with the launcher handoff.
export const paperPath = "M41 29H61L73 41V73Q73 79 67 79H41Q35 79 35 73V35Q35 29 41 29Z";
export const foldPath = "M61 29V37Q61 41 65 41H73Z";
export const checkPath = "M45 64L51 70L64 57";
function Mark({ monochrome = false }: { monochrome?: boolean }) {
  return <svg viewBox="18 18 72 72" role="img" aria-label="Smart Paper launcher icon" style={{width:"100%",height:"100%"}}>
    <rect width="108" height="108" fill={monochrome ? "#d4e9dc" : "#0f766e"}/>
    <path d={paperPath} fill={monochrome ? "#294c3b" : "#fffdf5"}/>
    {!monochrome && <path d={foldPath} fill="#b6ddd0"/>}
    <path d="M44 47H59M44 53H54" fill="none" stroke={monochrome ? "#d4e9dc" : "#0f766e"} strokeWidth="3" strokeLinecap="round"/>
    <path d={checkPath} fill="none" stroke={monochrome ? "#d4e9dc" : "#0f766e"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function LauncherPreview({language="both",wide=false,themed=false}:{language?:"both"|"en"|"fa";wide?:boolean;themed?:boolean}) {
 const languages=language==="both"?["en","fa"] as const:[language];
 return <main style={{padding:24,background:"#f7f8f5",color:"#172b29",fontFamily:"sans-serif"}}>
  <h1 style={{fontSize:24}}>Smart Paper · Android launcher icon</h1><p>Proposed paper + completed plan. Mask simulations and actual 48px launcher scale.</p>
  <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>{languages.map(lang=><section key={lang} lang={lang} dir={lang==="fa"?"rtl":"ltr"} style={{width:wide?640:360,maxWidth:"100%",background:"#e7f4ef",padding:20,borderRadius:20}}>
   <h2>{lang==="fa"?"پیش‌نمایش آیکون برنامه":"Launcher preview"}</h2>
   <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>{["circle","rounded-square","squircle"].map(mask=><figure key={mask} style={{margin:0,textAlign:"center"}}><div style={{width:88,height:88,overflow:"hidden",borderRadius:mask==="circle"?"50%":mask==="squircle"?"32%":"20%"}}><Mark monochrome={themed}/></div><figcaption style={{fontSize:12,marginTop:8}}>{mask}</figcaption></figure>)}</div>
   <div style={{display:"flex",gap:24,alignItems:"start",marginTop:32}}>{[48,36,24].map(size=><figure key={size} style={{margin:0,textAlign:"center"}}><div style={{width:size,height:size,overflow:"hidden",borderRadius:"25%",margin:"auto"}}><Mark monochrome={themed}/></div><figcaption style={{fontSize:12,marginTop:8,maxWidth:88}}>{lang==="fa"?"اسمارت پیپر":"Smart Paper"}<br/>{size}px</figcaption></figure>)}</div>
   <p style={{fontSize:13,lineHeight:1.7}}>{lang==="fa"?"نماد در فارسی و انگلیسی یکسان است. نام زیر آیکون را لانچر نمایش می‌دهد.":"The symbol stays identical in Persian and English. The launcher supplies the app label."}</p>
  </section>)}</div>
  <p>All foreground points fit inside the central 66-unit safe circle. Themed colors here are a simulation; Android supplies its own theme tint.</p>
 </main>;
}
const meta={title:"Proposals/Android launcher icon",component:LauncherPreview,args:{language:"both",wide:false,themed:false},argTypes:{language:{control:"radio",options:["both","en","fa"]},wide:{control:"boolean"},themed:{control:"boolean"}}} satisfies Meta<typeof LauncherPreview>;
export default meta;type Story=StoryObj<typeof meta>;
export const Phone:Story={};
export const Themed:Story={args:{themed:true}};
export const Wide:Story={args:{wide:true}};
