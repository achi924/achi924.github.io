const ticksEl = document.getElementById('ticks');
    const secondsEl = document.getElementById('seconds');
    const minutesEl = document.getElementById('minutes');
    const readable = document.getElementById('readable');
    const presets = document.querySelectorAll('[data-ticks]');
    const copyBtn = document.getElementById('copy');
    const resetBtn = document.getElementById('reset');

    const toFixedTrim = (v, n)=>{
      return Number.parseFloat(v).toFixed(n).replace(/\.0+$/,'')
    }

    function updateFromTicks(){
      const t = Number(ticksEl.value) || 0;
      const s = t / 20;
      const m = s / 60;
      secondsEl.value = toFixedTrim(s,2);
      minutesEl.value = toFixedTrim(m,3);
      readable.textContent = `${t} ticks — ${toFixedTrim(s,2)} วินาที — ${toFixedTrim(m,3)} นาที`;
    }

    function updateFromSeconds(){
      const s = Number(secondsEl.value) || 0;
      const t = Math.round(s * 20);
      const m = s / 60;
      ticksEl.value = t;
      minutesEl.value = toFixedTrim(m,3);
      readable.textContent = `${t} ticks — ${toFixedTrim(s,2)} วินาที — ${toFixedTrim(m,3)} นาที`;
    }

    function updateFromMinutes(){
      const m = Number(minutesEl.value) || 0;
      const s = m * 60;
      const t = Math.round(s * 20);
      ticksEl.value = t;
      secondsEl.value = toFixedTrim(s,2);
      readable.textContent = `${t} ticks — ${toFixedTrim(s,2)} วินาที — ${toFixedTrim(m,3)} นาที`;
    }

    ticksEl.addEventListener('input', updateFromTicks);
    secondsEl.addEventListener('input', updateFromSeconds);
    minutesEl.addEventListener('input', updateFromMinutes);

    presets.forEach(b=>b.addEventListener('click', ()=>{
      ticksEl.value = Number(b.dataset.ticks);
      updateFromTicks();
    }))

    copyBtn.addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText(readable.textContent);
        copyBtn.textContent = 'คัดลอกแล้ว ✓';
        setTimeout(()=>copyBtn.textContent='คัดลอกผล',1200)
      }catch(e){
        copyBtn.textContent = 'ไม่สามารถคัดลอกได้';
        setTimeout(()=>copyBtn.textContent='คัดลอกผล',1400)
      }
    })

    resetBtn.addEventListener('click', ()=>{
      ticksEl.value = 0; secondsEl.value = 0; minutesEl.value = 0; updateFromTicks();
    })

    // เริ่มต้น
    updateFromTicks();