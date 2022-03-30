
const LoadingPost = (props: {key: number}) => {

    return (
        <>
            <div key={props.key} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <div className="w-full h-96 bg-gray-700"></div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="w-full grid gap-y-2">
                  <h3 className="text-sm text-gray-400">
                    <a href={undefined}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <div className="text-transparent bg-gray-700 w-2/3 rounded">sample</div>
                    </a>
                  </h3>
                  <h3 className="text-sm text-gray-400">
                    <a href='#'>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <div className="text-transparent bg-gray-700 w-1/2 rounded">sample</div>
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">
                    <div className="text-transparent bg-gray-700 w-1/6 rounded">sample</div>
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900"></p>
              </div>
            </div>
        </>
    )
}

export default LoadingPost