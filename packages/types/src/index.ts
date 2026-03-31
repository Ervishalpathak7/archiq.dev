export interface DesignJSON {
  title: string
  components: { id: string; label: string; type: string }[]
  connections: { from: string; to: string; label?: string; protocol?: string }[]
  techStack: {
    frontend?: string
    backend?: string
    database?: string
    cache?: string
    queue?: string
    infra?: string
  }
  scalingNotes: string[]
  lldModules: { name: string; responsibilities: string[]; endpoints?: string[]; schema?: string }[]
}