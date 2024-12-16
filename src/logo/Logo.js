import { THREE } from '../name-space'

const logoImage = `
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAAAWCAYAAACrBTAWAAAACXBIWXMAAAsSAAALEgHS3X78AAAF0ElEQVRYhe1ZfWxTVRQ/re4j2xx9ezWb0I3t4WAIyaZV2FCGf5Q/yD4MSIlJt4SMpIQA+ofBVsJilujSEtAETUghMxA+TLYwxlAhWQ2IkhJYoUQgoFBkFYXJW8fYkG3Yax6cS+7efa8rQRZN+ktOXnvvOfee+7vnnnduayCEQBJPF8Ykv08fSZInAM8+6RQFtSsWkexc4e65IxflUOA0p5DEk0WySZqREsvONUd2N+81za+bzSkkAQmRnCmYU8SyisopDvfyvMpqu1hWMZ329YcvjaYJU7LFsooiAuQZznh8CP/DbXhsn3Wri8wcc0aeo2mdoWjO/Htn9ncZbt+MkEm5qammyVZjUfmskaNbt/R0tnRkCubs9KnFM+/1/BIc6rt1nxsoProAoA0AtqGWBABRlERsFSzkeng4ASAMAH6uJz4E9MWDPtoBwAUA0xL08SEUktWSYRLFkg3tRy01DQ0ZgvhgIyw1DQuo3qSi6eK0NZ/vtDg+/ETL/jGklRDiIoR0EUIk/HwlQXtFv5sQYkc7j4YOFaW/jxBiJYQ48bsP5/Jp6FOh41M/6VNLV1e4SM7MMRsLVm8/3HtwY1NsQD4vVr3XPHzt9K93ey60y6HAZVbXUr/eY7h982Kks2UHt3vxYQUAH0ZXFJ9ebFO+u3WsfUx02ZjIDGO0+eNEtoR63Xh6/DiGEyNTCzb01Y/2LrS14rNNw4YDl5Nz3njr7ZHb1wN/98sXxdV7Dw2ePXQ40tmyUU2wgug32xpT31zlyKusmW2Spqdzo+sjiMdPQJHwaUOyrbh4NUl2XLCi8yqO42c2yaszoxMJohsCuGGAY6hhxXTkw3md+GQ3x8VZ6YAr4bJKq+tu7HEvf6F+45e9u9a8K4dOnNI2BRjquzVaULviK2FBw3YAg5xft/67yO7mzzhFHi50XECn2/C7EqGtTLuaZNrWjeTQiF6pEf02hhz1eNFxXmA0h9OoFZioDuJ8CUUxaJE8KuSLafnFpcP916/GI5hiqOfC97FJuRVDx/d9lOfwbgGAREgOM6nCj6SH0fkujNKwysbPEBXEBSsLX6axIVSfvkS7mYilRGlFMIWEvtjRDwFPXjfjc8IYky7EsvLs1GhEHu2XeweO7dqUyCCxAfm3FNPkgjyHZ0/vQe/HnAIPOy7CjQuOYlRIjKaaYBZWhgiaVpSN6UOxM7pBzNVRVcqgeV3SIXuhygfnOJEfF2MiWQ6dGHhxc7cgnw1ciGfEImve0sXGwvLS3l1r7XIoEOIUxkJiyKSOuzAyVmKq0Fq0FfsAyQkyJPgZG5uqtHIxel78zBLPlo9asDInQniM8nIMuBcfAKSZpBnPc60q5FVWvzazsaM19eXF60aObl0nhwI/cErasDKtbuYospWGGkGMrmmYSlYiaUG0p8ffyxxlOzMHRRSJ9zKbReFR+UZtJaZ6cTP+2VSnTxdjSLbUr29K6Y9cF6rWvq9lkCmY0wtqV7zzUuP+jozSRct6D3o+ADAM3jn3YyenrI0w5lAvOuxiosODi5aYUo2FFvnxjrCfqTboCWrFDW1T2UtMGmNBX3Zu5kVIYVOlJn0wF4yMkg3t32YIorFkQ/vhnNLy15X2nNK5Yu78qiWFa77YKW0+1WGpaVhlKirOenBBcbg9luqGOr0iPI7QAt+D4sOLgtIn4CWhL84Fw8lcMJwa/Wq5woxPxY72VK7g3PSi40Mf2YuJh2nvG+ci80jGXEZmNnbsGBEsltjVE/eNhXMXGAGuxa6dDIxcDR4fPH/8QDR86U94+MOQaK5au2k4+vtPkd3Nn+ruoDZo1LTpRCcwtbNe+rAypV4iV1yrTq7Xm8fGVECsrhPHon3x8vkjaN740vOLn4vdkf/Kmrd0ddorS2rvnWk/SQj8YQRISREmzzIUzp0ydKCp+caxr49wI04cJFXt/J8FR7Iayq9w6VOL5wCA8jIcAYDLcijwM6eYhC6S//FNALRKuCT+TQDAPw+wySrs4lNTAAAAAElFTkSuQmCC
`
const DEF_OPTS = {
  image: logoImage,
  size: [80, 20],
}

const loader = new THREE.TextureLoader()

class Logo {
  constructor(canvas, options = {}) {
    this._options = {
      ...DEF_OPTS,
      ...options,
    }
    this._logoCamera = new THREE.OrthographicCamera(
      canvas.clientWidth / -2,
      canvas.clientWidth / 2,
      canvas.clientHeight / 2,
      canvas.clientHeight / -2,
      0.1,
      10
    )
    this._logoCamera.position.z = 1
    this._plane = new THREE.Mesh(
      new THREE.PlaneGeometry(this._options.size[0], this._options.size[1]),
      new THREE.MeshBasicMaterial({
        map: loader.load(this._options.image),
        transparent: true,
      })
    )
    this._plane.position.set(
      (this._options.size[0] - canvas.clientWidth) / 2 + 5,
      (this._options.size[1] - canvas.clientHeight) / 2 + 5,
      0
    )
  }

  /**
   *
   * @param {*} renderer
   */
  update(renderer) {
    renderer.render(this._plane, this._logoCamera)
  }
}

export default Logo
