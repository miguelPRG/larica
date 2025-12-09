export function SpinLoading(){
    return(
        <div className="flex justify-center items-center h-screen bg-dark-main">
              <div
                className="
                w-20 h-20 
                border-4 
                border-light-three 
                border-t-primary-main 
                rounded-full 
                animate-spin
              "
              ></div>
            </div>
    );
}