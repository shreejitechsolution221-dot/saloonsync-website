'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { featurePages, solutions } from '@/lib/content';
import { Icon } from './icon';
export function Brand() {
 return <Link href="/" className="brand" aria-label="Saloonsync home"><Image className="brand-image" src="/saloonsync-logo.png" alt="" width={44} height={44} sizes="44px" priority />Saloonsync<span className="brand-dot">.</span></Link>;
}
export function Header({loginUrl}:{loginUrl?:string;registerUrl?:string}) {
 const [open,setOpen]=useState(false);
 const [dropdown,setDropdown]=useState<string|null>(null);
 const header=useRef<HTMLElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const pathname=usePathname();
 const close=()=>{setOpen(false);setDropdown(null);};
 useEffect(() => {
  if (!open) return;
  const mobile = matchMedia('(max-width: 800px)');
  const previousOverflow = document.body.style.overflow;
  const syncScrollLock = () => { document.body.style.overflow = mobile.matches ? 'hidden' : previousOverflow; };
  syncScrollLock();
  mobile.addEventListener('change', syncScrollLock);
  return () => {
   mobile.removeEventListener('change', syncScrollLock);
   document.body.style.overflow = previousOverflow;
  };
 }, [open]);
 useEffect(()=>{function outside(e:PointerEvent){if(!header.current?.contains(e.target as Node)){setOpen(false);setDropdown(null);}}document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[]);
 const groups=[
 {name:'Features',href:'/features',caption:'ALL THE MOVING PARTS, TOGETHER',description:'A shared home for appointments, people and the business behind your craft.',items:featurePages.map(f=>({name:f.name,href:`/features/${f.slug}`,icon:f.icon}))},
 {name:'Solutions',href:'/solutions',caption:'FOR YOUR NEXT CHAPTER',description:'Explore Saloonsync around the way your salon business works.',items:solutions.map(s=>({name:s.name,href:`/solutions/${s.slug}`,icon:s.icon}))},
 {name:'Resources',href:'/help',caption:'A LITTLE MORE CLARITY',description:'Get to know the product, find an answer or start a conversation.',items:[{name:'Help center',href:'/help',icon:'people'},{name:'Journal',href:'/blog',icon:'spark'},{name:'About Saloonsync',href:'/about',icon:'box'},{name:'Contact us',href:'/contact',icon:'card'}]},
 ];
 return <header ref={header} className="site-header" onKeyDown={e=>{if(e.key==='Escape'){const active=dropdown;close();if(active)header.current?.querySelector<HTMLButtonElement>(`[data-menu="${active}"]`)?.focus();else trigger.current?.focus();}}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))close();}}><div className="container header-inner"><Brand/><button ref={trigger} className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={()=>{setOpen(!open);setDropdown(null);}}><Icon name={open?'close':'menu'}/></button><nav id="main-navigation" className={open?'navigation is-open':'navigation'} aria-label="Main navigation"><div className="nav-links">{groups.map(g=><div className="nav-group" key={g.name} onPointerEnter={e=>{if(e.pointerType==='mouse' && matchMedia('(min-width: 801px)').matches)setDropdown(g.name);}} onPointerLeave={e=>{if(e.pointerType==='mouse' && matchMedia('(min-width: 801px)').matches)setDropdown(null);}}><button data-menu={g.name} className="nav-trigger" aria-expanded={dropdown===g.name} aria-controls={`dropdown-${g.name}`} onClick={e=>setDropdown((e.nativeEvent as PointerEvent).pointerType==='mouse' && matchMedia('(min-width: 801px)').matches ? g.name : dropdown===g.name?null:g.name)}>{g.name}<Icon name="chevron" size={12}/></button><div className="nav-dropdown" id={`dropdown-${g.name}`} hidden={dropdown!==g.name}><div className="dropdown-layout"><div className="dropdown-intro"><span className="dropdown-caption">{g.caption}</span><p className="dropdown-description">{g.description}</p><Link className="dropdown-overview" href={g.href} onClick={close}>Explore {g.name.toLowerCase()}<Icon name="arrow" size={15}/></Link></div><div className="dropdown-links">{g.items.map(item=><Link key={item.href} href={item.href} onClick={close} aria-current={pathname===item.href?'page':undefined}><Icon name={item.icon} size={18}/>{item.name}<Icon name="arrow" size={13}/></Link>)}</div></div></div></div>)}<Link href="/pricing" onClick={close} aria-current={pathname==='/pricing'?'page':undefined}>Pricing</Link></div><div className="nav-actions"><a href={loginUrl||'/#identity'} onClick={close}>Log in ↗</a><Link className="button button-small" href="/book-a-demo" onClick={close}>Book a demo<Icon name="arrow" size={16}/></Link></div></nav></div></header>;
}



