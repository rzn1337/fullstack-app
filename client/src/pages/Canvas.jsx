import React from 'react'
import CanvasComponent from "../components/Canvas/Canvas"
import Button from '../components/Button'
import { Save } from 'lucide-react'

function Canvas() {
  return (
    <div>
        <Button><Save /></Button>
        <CanvasComponent />
        
    </div>
  )
}

export default Canvas