/**
 * Creates a new GeoTIFF from a remote URL.
 * @param {string} url The URL to access the image from
 * @param {object} [options] Additional options to pass to the source.
 *                           See {@link makeRemoteSource} for details.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
export function fromUrl(url: string, options?: object, signal?: AbortSignal | undefined): Promise<GeoTIFF>;
/**
 * Construct a new GeoTIFF from an
 * [ArrayBuffer]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer}.
 * @param {ArrayBuffer} arrayBuffer The data to read the file from.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
export function fromArrayBuffer(arrayBuffer: ArrayBuffer, signal?: AbortSignal | undefined): Promise<GeoTIFF>;
/**
 * Construct a GeoTIFF from a local file path. This uses the node
 * [filesystem API]{@link https://nodejs.org/api/fs.html} and is
 * not available on browsers.
 *
 * N.B. After the GeoTIFF has been completely processed it needs
 * to be closed but only if it has been constructed from a file.
 * @param {string} path The file path to read from.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
export function fromFile(path: string, signal?: AbortSignal | undefined): Promise<GeoTIFF>;
/**
 * Construct a GeoTIFF from an HTML
 * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob} or
 * [File]{@link https://developer.mozilla.org/en-US/docs/Web/API/File}
 * object.
 * @param {Blob|File} blob The Blob or File object to read from.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<GeoTIFF>} The resulting GeoTIFF file.
 */
export function fromBlob(blob: Blob | File, signal?: AbortSignal | undefined): Promise<GeoTIFF>;
/**
 * Construct a MultiGeoTIFF from the given URLs.
 * @param {string} mainUrl The URL for the main file.
 * @param {string[]} overviewUrls An array of URLs for the overview images.
 * @param {Object} [options] Additional options to pass to the source.
 *                           See [makeRemoteSource]{@link module:source.makeRemoteSource}
 *                           for details.
 * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
 *                               to be aborted
 * @returns {Promise<MultiGeoTIFF>} The resulting MultiGeoTIFF file.
 */
export function fromUrls(mainUrl: string, overviewUrls?: string[], options?: any, signal?: AbortSignal | undefined): Promise<MultiGeoTIFF>;
/**
 * Main creating function for GeoTIFF files.
 * @param {(Array)} array of pixel values
 * @returns {metadata} metadata
 */
export function writeArrayBuffer(values: any, metadata: any): any;
export default GeoTIFF;
export type TypedArray = Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
export type GeoTIFFOptions = {
    /**
     * whether or not decoded tiles shall be cached.
     */
    cache?: boolean | undefined;
};
/**
 * @typedef {Object} GeoTIFFOptions
 * @property {boolean} [cache=false] whether or not decoded tiles shall be cached.
 */
/**
 * The abstraction for a whole GeoTIFF file.
 * @augments GeoTIFFBase
 */
export class GeoTIFF extends GeoTIFFBase {
    /**
     * Parse a (Geo)TIFF file from the given source.
     *
     * @param {*} source The source of data to parse from.
     * @param {GeoTIFFOptions} [options] Additional options.
     * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
     *                               to be aborted
     */
    static fromSource(source: any, options?: GeoTIFFOptions | undefined, signal?: AbortSignal | undefined): Promise<GeoTIFF>;
    /**
     * @constructor
     * @param {*} source The datasource to read from.
     * @param {boolean} littleEndian Whether the image uses little endian.
     * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
     * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
     *                                to the first IFD.
     * @param {GeoTIFFOptions} [options] further options.
     */
    constructor(source: any, littleEndian: boolean, bigTiff: boolean, firstIFDOffset: number, options?: GeoTIFFOptions | undefined);
    source: any;
    littleEndian: boolean;
    bigTiff: boolean;
    firstIFDOffset: number;
    cache: boolean;
    ifdRequests: any[];
    ghostValues: {} | null;
    getSlice(offset: any, size: any): Promise<DataSlice>;
    /**
     * Instructs to parse an image file directory at the given file offset.
     * As there is no way to ensure that a location is indeed the start of an IFD,
     * this function must be called with caution (e.g only using the IFD offsets from
     * the headers or other IFDs).
     * @param {number} offset the offset to parse the IFD at
     * @returns {Promise<ImageFileDirectory>} the parsed IFD
     */
    parseFileDirectoryAt(offset: number): Promise<ImageFileDirectory>;
    requestIFD(index: any): Promise<any>;
    /**
     * Get the n-th internal subfile of an image. By default, the first is returned.
     *
     * @param {number} [index=0] the index of the image to return.
     * @returns {Promise<GeoTIFFImage>} the image at the given index
     */
    getImage(index?: number | undefined): Promise<GeoTIFFImage>;
    /**
     * Returns the count of the internal subfiles.
     *
     * @returns {Promise<number>} the number of internal subfile images
     */
    getImageCount(): Promise<number>;
    /**
     * Get the values of the COG ghost area as a parsed map.
     * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
     * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
     */
    getGhostValues(): Promise<any>;
    /**
     * Closes the underlying file buffer
     * N.B. After the GeoTIFF has been completely processed it needs
     * to be closed but only if it has been constructed from a file.
     */
    close(): any;
}
/**
 * Wrapper for GeoTIFF files that have external overviews.
 * @augments GeoTIFFBase
 */
export class MultiGeoTIFF extends GeoTIFFBase {
    /**
     * Construct a new MultiGeoTIFF from a main and several overview files.
     * @param {GeoTIFF} mainFile The main GeoTIFF file.
     * @param {GeoTIFF[]} overviewFiles An array of overview files.
     */
    constructor(mainFile: GeoTIFF, overviewFiles: GeoTIFF[]);
    mainFile: GeoTIFF;
    overviewFiles: GeoTIFF[];
    imageFiles: GeoTIFF[];
    fileDirectoriesPerFile: ImageFileDirectory[] | null;
    fileDirectoriesPerFileParsing: any;
    imageCount: number | null;
    parseFileDirectoriesPerFile(): Promise<ImageFileDirectory[]>;
    /**
     * Get the n-th internal subfile of an image. By default, the first is returned.
     *
     * @param {number} [index=0] the index of the image to return.
     * @returns {Promise<GeoTIFFImage>} the image at the given index
     */
    getImage(index?: number | undefined): Promise<GeoTIFFImage>;
    /**
     * Returns the count of the internal subfiles.
     *
     * @returns {Promise<number>} the number of internal subfile images
     */
    getImageCount(): Promise<number>;
    imageCounts: number[] | undefined;
}
import * as globals from "./globals.js";
import * as rgb from "./rgb.js";
import { getDecoder } from "./compression/index.js";
import { addDecoder } from "./compression/index.js";
import { setLogger } from "./logging.js";
import Pool from "./pool.js";
import GeoTIFFImage from "./geotiffimage.js";
declare class GeoTIFFBase {
    /**
     * (experimental) Reads raster data from the best fitting image. This function uses
     * the image with the lowest resolution that is still a higher resolution than the
     * requested resolution.
     * When specified, the `bbox` option is translated to the `window` option and the
     * `resX` and `resY` to `width` and `height` respectively.
     * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
     * image is called and the result returned.
     * @see GeoTIFFImage.readRasters
     * @param {import('./geotiffimage').ReadRasterOptions} [options={}] optional parameters
     * @returns {Promise<(TypedArray|TypedArray[])>} the decoded arrays as a promise
     */
    readRasters(options?: import("./geotiffimage.js").ReadRasterOptions | undefined): Promise<(TypedArray | TypedArray[])>;
}
import DataSlice from "./dataslice.js";
/**
 * Data class to store the parsed file directory, geo key directory and
 * offset to the next IFD
 */
declare class ImageFileDirectory {
    constructor(fileDirectory: any, geoKeyDirectory: any, nextIFDByteOffset: any);
    fileDirectory: any;
    geoKeyDirectory: any;
    nextIFDByteOffset: any;
}
export { globals, rgb, getDecoder, addDecoder, setLogger, Pool, GeoTIFFImage };
//# sourceMappingURL=geotiff.d.ts.map