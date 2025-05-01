import React from 'react'
import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

const ProductSkeleton = () => {
  return (
    <Card className="w-full h-full flex flex-col justify-between rounded-2xl animate-pulse gap-0 p-0">
        <Skeleton className='rounded-[10px] h-[241px] w-[241px] m-6' />
        <Skeleton className='rounded-[10px] w-1/2 h-4 mx-6'  />
        <Skeleton className='rounded-[10px] w-1/2 h-4 mx-6 mt-2'  />
        <Skeleton className='rounded-[10px] w-1/2 h-2 m-6' />
    </Card>
  )
}

export default ProductSkeleton