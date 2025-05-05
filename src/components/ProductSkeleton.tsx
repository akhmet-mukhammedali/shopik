import { Skeleton } from './ui/skeleton'

const ProductSkeleton = () => {
  return (
    <div>
      <Skeleton className='w-full h-[206px] rounded-[7px]' />
      <Skeleton  className='w-1/2 h-5 rounded-[7px] mt-3'/>
      <div className='flex gap-2 mt-2'>
        <Skeleton className='w-1/5 h-4 rounded-[7px]'/>
        <Skeleton className='w-1/2 h-4 rounded-[7px]' />
      </div>
    </div>
  )
}

export default ProductSkeleton