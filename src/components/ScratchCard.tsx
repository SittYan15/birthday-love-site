import { PointerEvent, useEffect, useRef, useState } from 'react'

const prize = {
  emoji: '🎁',
  title: 'အထူးဆုကြီး ပေါက်ပါပြီ!',
  text: 'unlimited kisses 😘 + unlimited hugs 🤗 from ကိုကို ❤️',
  note: 'ပြန်လဲလို့မရ၊ ကုန်ဆုံးရက်မရှိ 😌',
}

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const scratchingRef = useRef(false)
  const moveCountRef = useRef(0)
  const [revealed, setRevealed] = useState(false)

  const paintCover = () => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return

    const parent = canvas.parentElement
    if (!parent) return

    const rect = parent.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)

    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#ef8ea3')
    gradient.addColorStop(0.5, '#d96580')
    gradient.addColorStop(1, '#b94a66')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.globalAlpha = 0.18
    ctx.fillStyle = '#fff'
    const spacing = 42
    for (let y = 22; y < height; y += spacing) {
      for (let x = 22; x < width; x += spacing) {
        ctx.font = '18px system-ui'
        ctx.fillText((x / spacing + y / spacing) % 2 > 1 ? '♡' : '✦', x, y)
      }
    }
    ctx.globalAlpha = 1

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#fff'
    ctx.font = `800 ${Math.max(22, Math.min(34, width / 16))}px system-ui`
    ctx.fillText('Scratch me ✨', width / 2, height / 2 - 12)
    ctx.font = `600 ${Math.max(13, Math.min(16, width / 34))}px system-ui`
    ctx.globalAlpha = 0.9
    ctx.fillText('Use your finger or mouse', width / 2, height / 2 + 28)
    ctx.globalAlpha = 1
  }

  useEffect(() => {
    paintCover()

    const onResize = () => {
      if (!revealed) paintCover()
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed])

  const checkProgress = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const sampleStep = Math.max(4, Math.floor((window.devicePixelRatio || 1) * 10))
    let sampled = 0
    let transparent = 0

    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const alpha = pixels[(y * canvas.width + x) * 4 + 3]
        sampled += 1
        if (alpha < 32) transparent += 1
      }
    }

    if (sampled > 0 && transparent / sampled > 0.42) {
      setRevealed(true)
    }
  }

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!scratchingRef.current || revealed) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = canvas.width / rect.width
    const x = (event.clientX - rect.left) * dpr
    const y = (event.clientY - rect.top) * dpr
    const radius = 30 * dpr

    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    moveCountRef.current += 1
    if (moveCountRef.current % 8 === 0) checkProgress()
  }

  const startScratch = (event: PointerEvent<HTMLCanvasElement>) => {
    scratchingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    scratch(event)
  }

  const stopScratch = () => {
    scratchingRef.current = false
    checkProgress()
  }

  return (
    <section className="cute-scratch-section" id="scratch">
      <style>{`
        .cute-scratch-section{width:min(920px,calc(100% - 32px));margin:0 auto;padding:clamp(72px,9vw,112px) 0;text-align:center}
        .cute-scratch-section .scratch-heading{max-width:650px;margin:0 auto 34px}
        .cute-scratch-section .scratch-heading h2{font-family:Georgia,serif;font-size:clamp(36px,6vw,58px);line-height:1.05;margin:6px 0 14px;color:#49313a}
        .cute-scratch-section .scratch-heading p{color:#806d74;line-height:1.7}
        .scratch-wrap{position:relative;min-height:300px;border-radius:34px;overflow:hidden;background:linear-gradient(145deg,#fff,#fff3f6);box-shadow:0 24px 65px rgba(126,69,87,.15);border:1px solid rgba(217,99,124,.15)}
        .scratch-prize{position:absolute;inset:0;display:grid;place-items:center;padding:34px;background:radial-gradient(circle at 50% 30%,#fff 0,#fff7f9 62%,#ffeef3 100%)}
        .scratch-prize-inner{max-width:560px}
        .scratch-prize .gift{font-size:58px;display:block;animation:scratchBob 1.7s ease-in-out infinite}
        .scratch-prize h3{font-family:Georgia,serif;font-size:clamp(28px,5vw,44px);margin:8px 0 12px;color:#b94a66}
        .scratch-prize p{font-size:clamp(1rem,2.8vw,1.22rem);line-height:1.75;margin:0;color:#5e4650}
        .scratch-prize small{display:block;margin-top:12px;color:#9a7d86}
        .scratch-canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab;transition:opacity .5s ease,transform .5s ease}
        .scratch-canvas:active{cursor:grabbing}
        .scratch-canvas.is-revealed{opacity:0;transform:scale(1.04);pointer-events:none}
        .scratch-hint{margin-top:16px;color:#a17f89;font-size:.84rem}
        @keyframes scratchBob{50%{transform:translateY(-6px) rotate(4deg)}}
        @media(max-width:640px){.scratch-wrap{min-height:330px;border-radius:26px}.cute-scratch-section{width:calc(100% - 24px)}}
      `}</style>

      <div className="scratch-heading">
        <span className="eyebrow">ကို့ကလေးလေးအတွတ် လက်ဆောင်</span>
        <h3>ခြစ်ပြီးတော့ ကံစမ်းမဲဖောက်ကြည့် နော် 🎁</h3>
        <p>တစ်ခုခုထူးဆန်းတာလေး ဖွက်ထားတယ်။</p>
      </div>

      <div className="scratch-wrap">
        <div className="scratch-prize">
          <div className="scratch-prize-inner">
            <span className="gift">{prize.emoji}</span>
            <h4 style={{color:'#d46b82'}}>{prize.title}</h4>
            <p>{prize.text}</p>
            <small>{prize.note}</small>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className={`scratch-canvas ${revealed ? 'is-revealed' : ''}`}
          onPointerDown={startScratch}
          onPointerMove={scratch}
          onPointerUp={stopScratch}
          onPointerCancel={stopScratch}
          onPointerLeave={() => {
            if (scratchingRef.current) stopScratch()
          }}
          aria-label="Scratch card"
        />
      </div>

      <div className="scratch-hint">
        {revealed ? 'Yay! You found it 💕' : 'Scratch away about half of the card to reveal it ✨'}
      </div>
    </section>
  )
}
