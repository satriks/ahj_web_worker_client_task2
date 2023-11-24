import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import convertTimestampToDate from '../../components/convertTimestamp'

export default class NewsWidget {
  constructor (element, url) {
    this.element = element
    this.url = url
    this.newsWidget = null
    this.newsContainer = document.querySelector('.news__container')
    this.createDom()
    this.getPreloadMassage()
    // this.createNews()
  }

  createDom () {
    const newsWidget = document.createElement('div')
    newsWidget.className = 'news__wrapper'
    this.newsWidget = newsWidget

    const head = document.createElement('div')
    head.className = 'news__head'

    const title = document.createElement('span')
    title.className = 'news__title'
    title.textContent = 'Новости мира музыки'

    const update = document.createElement('span')
    update.className = 'news__update'
    update.textContent = 'Обновить'
    head.append(title, update)

    const newsContainer = document.createElement('div')
    newsContainer.className = 'news__container'
    this.newsContainer = newsContainer

    newsWidget.append(head, newsContainer)
    this.element.append(newsWidget)
  }

  createMassage (date, img, title) {
    const newMessage = document.createElement('div')
    newMessage.className = 'news'

    const newsDate = document.createElement('span')
    newsDate.className = 'news__date'
    newsDate.textContent = convertTimestampToDate(date)

    const newsData = document.createElement('div')
    newsData.className = 'news__data'

    const newsImg = document.createElement('img')
    newsImg.className = 'news__img'
    if (img) { newsImg.src = img } else { newsImg.src = 'https://vjoy.cc/wp-content/uploads/2019/10/muzyka-dlya-zdorovya-serdtsa.jpg' }

    const newsTitle = document.createElement('span')
    newsTitle.className = 'news__title'
    newsTitle.textContent = title

    newsData.append(newsImg, newsTitle)
    newMessage.append(newsDate, newsData)

    this.newsContainer.append(newMessage)
  }

  createPreloadMassage () {
    const newMessage = document.createElement('div')
    newMessage.className = 'news'

    const newsDate = document.createElement('span')
    newsDate.className = 'news__date'

    const newsData = document.createElement('div')
    newsData.className = 'news__data'

    const newsImg = document.createElement('img')
    newsImg.className = 'news__img'

    const preloadTitle = document.createElement('div')
    preloadTitle.className = 'news__preload'

    const newsTitle = document.createElement('span')
    newsTitle.className = 'news__title'
    newsTitle.classList.add('loading-data')

    const newsTitle2 = document.createElement('span')
    newsTitle2.className = 'news__title'
    newsTitle2.classList.add('loading-data')
    preloadTitle.append(newsTitle, newsTitle2)

    newMessage.classList.add('loading')
    newsDate.classList.add('loading-data')

    newsData.append(newsImg, preloadTitle)
    newMessage.append(newsDate, newsData)

    this.newsContainer.append(newMessage)
  }

  getPreloadMassage () {
    let n = 0
    while (n < 5) {
      this.createPreloadMassage()
      n++
    }
  }

  clearNews () {
    this.newsContainer.remove()
    const newsContainer = document.createElement('div')
    newsContainer.className = 'news__container'
    this.newsContainer = newsContainer
    this.newsWidget.append(newsContainer)
  }

  createNews () {
    ajax.getJSON(this.url + '/news')
      .pipe(
        map(data => data.news),
        catchError(err => of(500))
      )
      .subscribe(data => {
        if (data === 500) {
          console.log('вывод ошибки')
          const errorMessage = document.createElement('div')
          errorMessage.className = 'error__message'
          const text1 = document.createElement('span')
          text1.textContent = 'Не удалось загрузить данные'
          const text2 = document.createElement('span')
          text2.textContent = 'Проверьте подключение'
          const text3 = document.createElement('span')
          text3.textContent = 'и обновите страницу.'
          // const text = `Не удалось загрузить данные. \nПроверьте подключение \nи обновите страницу.`
          errorMessage.append(text1, text2, text3)
          this.newsWidget.append(errorMessage)
          return
        }
        this.clearNews()
        for (const news of data) {
          this.checkUrl(news.image)
            .then(() => this.createMassage(news.received, news.image, news.title))
            .catch(() => {
              news.image = null
              this.createMassage(news.received, news.image, news.title)
            })
        }
      })
  }

  async checkUrl (url) {
    await fetch(url)
  }
}
