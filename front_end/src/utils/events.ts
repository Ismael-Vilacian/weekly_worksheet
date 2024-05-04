export class Events {

    publish(topico: string, ...args: any[]) {

        let documento = document as any;
        let topics = documento.eventos.filter((m: any) => m.topico === topico);
        for (let topic of topics) {
            topic.funcao(args);
        }
    }

    subscribe(topico: string, funcao: any): void {

        let documento = document as any;

        if (!documento.eventos) documento.eventos = [];

        documento.eventos.push({ topico, funcao });
    }
}