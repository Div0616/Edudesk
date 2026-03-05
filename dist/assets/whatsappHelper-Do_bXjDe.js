const s=(n,e,a,t)=>{const o=n.replace(/\D/g,""),r=encodeURIComponent(`Dear ${e},

Please find attached the academic report for *${a}*.

Kindly review their performance and feel free to reach out for any queries.

Regards,
${t}
EduDesk`);window.open(`https://wa.me/${o}?text=${r}`,"_blank")},c=n=>{const e=n.replace(/\D/g,"");return e.length>=10&&e.length<=15};export{c as i,s as o};
