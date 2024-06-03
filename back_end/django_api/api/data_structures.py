def busca_binaria(lista, prop, item):
    baixo = 0
    alto = len(lista) - 1

    while baixo <= alto:
        meio = (baixo + alto) // 2
        chute = lista[meio][prop]
        if chute == item:
            return meio
        if chute > item:
            alto = meio - 1
        else:
            baixo = meio + 1
    return None

def busca_sequencial(lista, prop, item):
    for i in range(len(lista)):
        if lista[i][prop] == item:
            return i
    return None

def bubble_sort(lista, prop):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j][prop] > lista[j + 1][prop]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]

def selection_sort(lista, prop):
    for i in range(len(lista)):
        min_idx = i
        for j in range(i+1, len(lista)):
            if lista[min_idx][prop] > lista[j][prop]:
                min_idx = j
        lista[i], lista[min_idx] = lista[min_idx], lista[i]

def insertion_sort(lista, prop):
    for i in range(1, len(lista)):
        key = lista[i]
        j = i-1
        while j >=0 and key[prop] < lista[j][prop] :
                lista[j+1] = lista[j]
                j -= 1
        lista[j+1] = key

def merge_sort(lista, prop):
    if len(lista) > 1:
        meio = len(lista) // 2
        esquerda = lista[:meio]
        direita = lista[meio:]

        merge_sort(esquerda, prop)
        merge_sort(direita, prop)

        i = j = k = 0

        while i < len(esquerda) and j < len(direita):
            if esquerda[i][prop] < direita[j][prop]:
                lista[k] = esquerda[i]
                i += 1
            else:
                lista[k] = direita[j]
                j += 1
            k += 1

        while i < len(esquerda):
            lista[k] = esquerda[i]
            i += 1
            k += 1

        while j < len(direita):
            lista[k] = direita[j]
            j += 1
            k += 1

def partition(lista, prop, baixo, alto):
    i = (baixo-1)
    pivot = lista[alto][prop]

    for j in range(baixo, alto):
        if lista[j][prop] <= pivot:
            i = i+1
            lista[i], lista[j] = lista[j], lista[i]

    lista[i+1], lista[alto] = lista[alto], lista[i+1]
    return (i+1)

def quick_sort(lista, prop, baixo, alto):
    if len(lista) == 1:
        return lista
    if baixo < alto:
        pi = partition(lista, prop, baixo, alto)
        quick_sort(lista, prop, baixo, pi-1)
        quick_sort(lista, prop, pi+1, alto)

def partition_type_2(lista, prop, baixo, alto):
    i = (baixo-1)
    pivot = getattr(lista[alto], prop)

    for j in range(baixo, alto):
        if getattr(lista[j], prop) <= pivot:
            i = i+1
            lista[i], lista[j] = lista[j], lista[i]

    lista[i+1], lista[alto] = lista[alto], lista[i+1]
    return (i+1)

def quick_sort2(lista, prop, baixo, alto):
    if len(lista) == 1:
        return lista
    if baixo < alto:
        pi = partition_type_2(lista, prop, baixo, alto)
        quick_sort2(lista, prop, baixo, pi-1)
        quick_sort2(lista, prop, pi+1, alto)