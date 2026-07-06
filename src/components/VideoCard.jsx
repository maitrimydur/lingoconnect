export default function VideoCard({ lesson }) {
  return (
    <div>
      {lesson.videoId ? (
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${lesson.videoId}`}
            title={lesson.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm text-center px-4">
          Video coming soon
        </div>
      )}
      <p className="mt-3 font-semibold text-slate-900">
        {lesson.videoTitle} {lesson.channel && <span className="font-normal text-slate-500">| {lesson.channel}</span>}
      </p>
      <p className="mt-2 text-sm text-slate-500">{lesson.description}</p>
    </div>
  )
}
